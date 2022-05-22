
let images = [];
var imagesDiv = document.getElementById("images")
var searchWord = document.getElementById("search");
var loader = document.getElementById("loader");
var idsLikesImages = [];

window.addEventListener('load', function () {
    // Check if there's arrray of liked images in the cookies.
    var array = `; ${document.cookie}`.match(`;\\s*${"liked_images"}=([^;]+)`);
    idsLikesImages = array ? JSON.parse(array[1]) : [];
});

searchWord.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        search();
    }
});

function search() {
    if (!searchWord.value || searchWord.value.length == 0 || !searchWord.value.trim()) {
        return;
    }
    loader.style.display = "block";
    imagesDiv.style.display = "none";
    fetchImagesFromAPI().then((value) => {
        images = value;
        addImages();
        loader.style.display = "none";
        imagesDiv.style.display = "block";
    }).catch((e) => {
        loader.style.display = "none";
        alert(e);
    })
}

async function fetchImagesFromAPI() {
    var API_LINK = "./php/get_images.php";
    var requestOptions = {
        method: 'GET'
    }
    const response = await fetch(API_LINK + "?" + "&q=" + encodeURIComponent(searchWord.value), requestOptions)
    if (response.status == 200) {
        return await response.json();
    } else {
        throw 'Some error happened :(';
    }
}

function compare(a, b) {
    var sortBy = document.getElementById('sortBySelect').selectedOptions[0].value;
    if (a[sortBy] < b[sortBy]) {
        return 1;
    }
    else if (a[sortBy] > b[sortBy]) {
        return -1;
    }
    else {
        return 0;
    }
}

function sortImages() {
    images.sort(compare);
    addImages();
}

function addImages() {
    imagesDiv.innerHTML = "";
    var liked = false;
    if (images.length == 0) {
        imagesDiv.innerHTML += '<div>' +
            '                    <h1>' +
            '                        Sorry no images found :(' +
            '                    </h1>' +
            '            </div>';
    } else {
        for (imageItem of images) {
            // check if the image is liked or not (from cookies). 
            // [ I know this is not the best approach but it's what I can do because I don't have authentication in the app ]
            liked = readIdFromCookies(imageItem.id);

            imagesDiv.innerHTML += '<div>' +
                '                <img src="' + imageItem.url + '"' + (imageItem.title ? 'alt="' + imageItem.title + '"' : '') + '>' +
                '                <div class="info">' +
                '                    <div>' +
                '                        <i class="fa-regular fa-eye"></i>' + imageItem.views + '<i id="' + imageItem.id + '" class="fa-' + (liked ? 'solid' : 'regular') + ' fa-thumbs-up"></i><span id="likes-' + imageItem.id + '">' + imageItem.likes + '</span><br>' + (imageItem.title ? imageItem.title : '') + '' + (imageItem.username ? ' By @' + imageItem.username : '') +
                '                    </div>' +
                '                </div>' +
                '            </div>';

        }

        var API_LINK = "./php/update_image.php";
        var requestOptions = {
            method: 'GET'
        }

        document.querySelectorAll('.fa-thumbs-up').forEach(likeBtn => {
            // Check if button is already clicked (user has already liked the image).
            likeBtn.onclick = function (e) {
                var like = true;

                if (e.target.classList.contains('fa-solid')) {
                    like = false;
                }

                fetch(API_LINK + "?" + "id=" + e.target.id + "&like=" + like, requestOptions).then((value) => {
                    var likesCount = document.getElementById("likes-" + e.target.id);
                    if (like) {
                        likesCount.innerHTML = parseInt(likesCount.innerHTML) + 1;
                        e.target.classList.remove("fa-regular");
                        e.target.classList.add("fa-solid");
                        setIDtoCookies(e.target.id);
                    } else {
                        likesCount.innerHTML = parseInt(likesCount.innerHTML) - 1;
                        e.target.classList.remove("fa-solid");
                        e.target.classList.add("fa-regular");
                        removeIDFromCookies(e.target.id);
                    }
                    // TODO: Update the likes of that image in the array. so sorting can works with the new like count.
                }).catch((e) => {
                    alert('NOOOOO WHAT HAPPEND!');
                });
            }
        });
    }
}

function updateCookies() {
    var date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000 * 1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = "liked_images=" + JSON.stringify(idsLikesImages) + expires + "; path=/";
}

function setIDtoCookies(id) {
    idsLikesImages.push(id);
    updateCookies();
}

function removeIDFromCookies(id) {
    var idIndex = idsLikesImages.indexOf(id);
    idsLikesImages.splice(idIndex, 1);
    updateCookies();
}

function readIdFromCookies(id) {
    if (idsLikesImages.indexOf(id) == -1) {
        return false;
    } else {
        return true;
    }
}
