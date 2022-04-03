
let images = [];
var imagesDiv = document.getElementById("images")
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == 200) {
            images = JSON.parse(xmlhttp.responseText);
            addImages();
        }
        else {
            alert('something else other than 200 was returned');
        }
    }
};
xmlhttp.open("GET", "https://picsum.photos/v2/list?limit=6&page=7", true);
xmlhttp.send();

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
            '                <img src="' + imageItem.download_url + '">' +
            '                <div class="info">' +
            '                    <span>' +
            '                        ID: ' + imageItem.id + ', Author: ' + imageItem.author +
            '                    </span>' +
            '                </div>' +
            '            </div>';
    }
}
