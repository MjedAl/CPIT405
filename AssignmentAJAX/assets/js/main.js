
let images = [];
var imagesDiv = document.getElementById("images")
var xmlhttp = new XMLHttpRequest();
var searchWord = document.getElementById("search");
var loader = document.getElementById("loader");
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
        images = value.data;
        addImages();
        loader.style.display = "none";
        imagesDiv.style.display = "block";
    }).catch((e) => {
        loader.style.display = "none";
        alert(e);
    })

}

async function fetchImagesFromAPI() {
    var API_LINK = "https://api.giphy.com/v1/gifs/search";
    var params = "api_key=4YZsPlWaTnZtgrU9lXg02VsWeYDpAsql&limit=18&rating=g&lang=en";
    var requestOptions = {
        method: 'GET'
    }
    const response = await fetch(API_LINK + "?" + params + "&q=" + encodeURIComponent(searchWord.value), requestOptions)
    if (response.status == 200) {
        return await response.json();
    } else {
        throw 'Some error happened :(';
    }
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

    if (images.length == 0) {
        imagesDiv.innerHTML += '<div>' +
            '                    <h1>' +
            '                        Sorry no images found :(' +
            '                    </h1>' +
            '            </div>';
    } else {
        for (imageItem of images) {
            imagesDiv.innerHTML += '<div>' +
                '                <img src="' + imageItem.images.downsized_medium.url + '"' + (imageItem.title ? 'alt="' + imageItem.title + '"' : '') + '>' +
                '                <div class="info">' +
                '                    <span>' +
                '                        ' + (imageItem.title ? imageItem.title : '') + '' + (imageItem.username ? ' By @' + imageItem.username : '') +
                '                    </span>' +
                '                </div>' +
                '            </div>';

        }
    }


}
