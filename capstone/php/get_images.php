<?php 
require_once('../php/db_connection.php');

header('Content-Type: text/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

echo json_encode(get_images($_GET['q']));

function get_images($keyword)
{
    // fetch images
    $curl = curl_init();
    $url = "https://api.giphy.com/v1/gifs/search?api_key=4YZsPlWaTnZtgrU9lXg02VsWeYDpAsql&limit=18&rating=g&lang=en&q=".$keyword;

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);

    curl_close($curl);

    $images = json_decode($result, true)['data'];
    $imagesFormatted = [];

    $select_query = "SELECT id, views, likes FROM images WHERE id = :id";
    $insert_query = "INSERT INTO images (id, views, likes) VALUES(:id, 1, 0)";
    $update_query = "UPDATE images set views = views + 1 WHERE id = :id";

    $select_statement = $GLOBALS['conn']->prepare($select_query);
    $insert_statement = $GLOBALS['conn']->prepare($insert_query);
    $update_statement = $GLOBALS['conn']->prepare($update_query);

    foreach($images as $image) {
        $id = validate_input($image['id']);
        $select_statement->bindParam('id', $id);

        if ($select_statement && $select_statement->execute()) {
            if ($select_statement->rowCount()> 0){
                while($row = $select_statement->fetch()) {
                    $update_statement->bindParam('id', $id);
                    if($update_statement) {
                        $update_statement->bindParam('id', $id);
                        if (!$update_statement->execute()) {
                            printf("Error executing SQL update statement: Erro number: %d,  %s\n",
                            $update_statement->errorCode(), $update_statement->errorInfo());
                            return;
                        }
                    }
                    array_push($imagesFormatted, (object)[
                        'id' => $id,
                        'title' => $image['title'],
                        'url' => $image['images']['downsized_medium']['url'],
                        'username' => $image['username'],
                        'likes' => $row['likes'],
                        'views' => $row['views'],
                    ]);
                }            
            }else{
                $insert_statement->bindParam('id', $id);
                if ($insert_statement && $insert_statement->execute()) {
                    array_push($imagesFormatted, (object)[
                        'id' => $id,
                        'title' => $image['title'],
                        'url' => $image['images']['downsized_medium']['url'],
                        'username' => $image['username'],
                        'likes' => '0',
                        'views' => '1',
                    ]);
                }
            }
        } else {
            echo("failed");
        }
    }
    return $imagesFormatted;
}