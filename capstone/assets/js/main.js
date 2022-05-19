
let images = [];
var imagesDiv = document.getElementById("images")
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
    if (images.length == 0) {
        imagesDiv.innerHTML += '<div>' +
            '                    <h1>' +
            '                        Sorry no images found :(' +
            '                    </h1>' +
            '            </div>';
    } else {
        for (imageItem of images) {
            imagesDiv.innerHTML += '<div>' +
                '                <img src="' + imageItem.url + '"' + (imageItem.title ? 'alt="' + imageItem.title + '"' : '') + '>' +
                '                <div class="info">' +
                '                    <span>' +
                '                        Views: ' + imageItem.views + '<button class="like-btn" id='+imageItem.id+'>'+imageItem.likes+' Likes</button><br>' + (imageItem.title ? imageItem.title : '') + '' + (imageItem.username ? ' By @' + imageItem.username : '') +
                '                    </span>' +
                '                </div>' +
                '            </div>';

        }

    document.querySelectorAll('.like-btn').forEach(button => {
        button.onclick = function (e) {
            var API_LINK = "./php/update_image.php";
            var requestOptions = {
                method: 'GET'
            }
            fetch(API_LINK + "?" + "id=" + e.target.id +"&like=true", requestOptions).then((value) => {
                e.target.innerHTML =(eval(e.target.innerHTML.split(" ")[0]) + 1) +  " Likes";
            }).catch((e) => {
                alert('NO WHAT HAPPEND!');
            });
        }
    });
}
}

