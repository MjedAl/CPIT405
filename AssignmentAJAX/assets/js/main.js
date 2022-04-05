
let images = [];
var imagesDiv = document.getElementById("images")
var xmlhttp = new XMLHttpRequest();
const clientId = "4YZsPlWaTnZtgrU9lXg02VsWeYDpAsql";

function search(e) {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                images = JSON.parse(xmlhttp.responseText).data;
                addImages();
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };
    xmlhttp.open("GET", "https://api.giphy.com/v1/gifs/search?api_key=4YZsPlWaTnZtgrU9lXg02VsWeYDpAsql&q=" + e.value + "&limit=25&offset=0&rating=g&lang=en", true);
    xmlhttp.setRequestHeader('Authorization', 'Client-ID ' + clientId);
    xmlhttp.send();
}



function compare(a, b) {
    var sortBy = document.getElementById('sortBySelect').selectedOptions[0].value;
    if (a[sortBy] < b[sortBy]) {
        return -1;
    }
    else if (a[sortBy] > b[sortBy]) {
        return 1;
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
    for (imageItem of images) {
        imagesDiv.innerHTML += '<div>' +
            '                <img src="' + imageItem.embed_url + '">' +
            '                <div class="info">' +
            '                    <span>' +
            '                        Title: ' + imageItem.title + ', Author: ' + imageItem.username +
            '                    </span>' +
            '                </div>' +
            '            </div>';
    }
}
