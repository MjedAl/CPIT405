
let images = [];
var imagesDiv = document.getElementById("images")
var xmlhttp = new XMLHttpRequest();

function search(e) {
    if (!e.value || e.value.length == 0 || !e.value.trim()) {
        return;
    }
    var API_LINK = "https://api.giphy.com/v1/gifs/search";
    var params = "api_key=4YZsPlWaTnZtgrU9lXg02VsWeYDpAsql&limit=9&rating=g&lang=en";
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
    xmlhttp.open("GET", API_LINK + "?" + params + "&q=" + encodeURIComponent(e.value) + "", true);
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
            '                <img src="' + imageItem.images.downsized_medium.url + '" alt="' + imageItem.title + '">' +
            '                <div class="info">' +
            '                    <span>' +
            '                        Title: ' + imageItem.title + '' + (imageItem.username ? ', Author: ' + imageItem.username : '') +
            '                    </span>' +
            '                </div>' +
            '            </div>';

    }
}
