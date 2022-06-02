<?php
require_once('./php/db_connection.php');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
    <link rel="stylesheet" href="./assets/css/styles.css?ver=0.3">
    <meta name="referrer" content="no-referrer">
    <title>Artly</title>
</head>

<body>
    <div class="header">
        <a href="./index.php">
            <h1>Artly - Top likes</h1>
        </a>
    </div>
    <div class="content">
        <div class="bar">
            <div class="navbar">
                <div>
                    <a class="active" href="./top-likes.php">
                        Top likes
                    </a>
                </div>
                <div>
                    <a href="./top-views.php">
                        Top views
                    </a>
                </div>
            </div>
        </div>
        <!--  -->
        <div id="images" class="images">
            <?php
            $select_query = "SELECT id, views, likes FROM images WHERE likes > 0 ORDER BY likes DESC LIMIT 30";
            $select_statement = $GLOBALS['conn']->prepare($select_query);
            if ($select_statement && $select_statement->execute()) {
                if ($select_statement->rowCount() > 0) {
                    while ($row = $select_statement->fetch()) {
                        echo ('<div>
                    <img src="https://media0.giphy.com/media/' . $row['id'] . '/giphy.gif">
                    <div class="info">
                    <div>
                    <i class="fa-regular fa-eye"></i>' . $row['views'] . '<i class="fa-regular fa-thumbs-up"></i><span>' . $row['likes'] . '</span><br></div></div></div>');
                    }
                }
            }
            ?>
        </div>

    </div>
</body>

</html>