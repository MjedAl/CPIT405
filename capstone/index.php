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
        <h1>Artly</h1>
    </div>
    <div class="content">
        <div class="bar">
            <div class="navbar">
                <div class="form-search">
                    <label for="search">Search for:</label>
                    <input placeholder='Search key' id="search" type="text" required>
                    <button onclick="search()">Search</button>
                </div>
                <div>
                    <a href="./top-likes.php">
                        Top likes
                    </a>
                </div>
                <div>
                    <a href="./top-views.php">
                        Top views
                    </a>
                </div>
            </div>
            <div class="sort">
                <span>Sort by:</span>
                <select id="sortBySelect" onchange="sortImages()">
                    <option selected disabled>Default</option>
                    <option value="title">Title</option>
                    <option value="username">Author name</option>
                    <option value="views">Views</option>
                    <option value="likes">Likes</option>
                </select>
            </div>
        </div>
        <!-- Images -->
        <div id="loader"></div>
        <div id="images" class="images">
            <!-- Will be populated from Js -->
        </div>
    </div>
    <script src="./assets/js/main.js?v=0.3"></script>
</body>

</html>