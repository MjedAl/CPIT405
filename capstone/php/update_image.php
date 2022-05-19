<?php 
require_once('../php/db_connection.php');

header('Content-Type: text/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

echo json_encode(like($_GET['id'], $_GET['like']));


function like($id, $like) {
    if ($like == "true"){
        $update_query = "UPDATE images set likes = likes + 1 WHERE id = :id";

    }else{
        $update_query = "UPDATE images set likes = likes - 1 WHERE id = :id";
    }
    $update_statement = $GLOBALS['conn']->prepare($update_query);
    if($update_statement) {
        $update_statement->bindParam('id', $id);
        if (!$update_statement->execute()) {
            printf("Error executing SQL update statement: Erro number: %d,  %s\n",
            $update_statement->errorCode(), $update_statement->errorInfo());
            return;
        }
    }
    return "sucuss";
}

?>

