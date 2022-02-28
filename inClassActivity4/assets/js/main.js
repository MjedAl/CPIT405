let images = [
    {
        numLikes: 10,
        numComments: 2,
        datePublished: new Date(2021, 2, 25),
        url: '../Assignment2/assets/images/1 (22).jpeg'
    },
    {
        numLikes: 6,
        numComments: 8,
        datePublished: new Date(2021, 2, 10),
        url: '../Assignment2/assets/images/1 (1).jpeg'
    },
    {
        numLikes: 8,
        numComments: 2,
        datePublished: new Date(2021, 2, 10),
        url: '../Assignment2/assets/images/1 (2).jpeg'
    },
    {
        numLikes: 4,
        numComments: 3,
        datePublished: new Date(2020, 2, 10),
        url: '../Assignment2/assets/images/1 (3).jpeg'
    },
    {
        numLikes: 99,
        numComments: 5,
        datePublished: new Date(2022, 2, 10),
        url: '../Assignment2/assets/images/1 (17).jpeg'
    },
    {
        numLikes: 2,
        numComments: 1,
        datePublished: new Date(2022, 2, 25),
        url: '../Assignment2/assets/images/1 (5).jpeg'
    },
    {
        numLikes: 2,
        numComments: 1,
        datePublished: new Date(2022, 2, 25),
        url: '../Assignment2/assets/images/1 (12).jpeg'
    },
    {
        numLikes: 2,
        numComments: 1,
        datePublished: new Date(2022, 2, 10),
        url: '../Assignment2/assets/images/1 (8).jpeg'
    },
    {
        numLikes: 20,
        numComments: 1,
        datePublished: new Date(2022, 2, 10),
        url: '../Assignment2/assets/images/1 (26).jpeg'
    },
    {
        numLikes: 20,
        numComments: 8,
        datePublished: new Date(2022, 2, 10),
        url: '../Assignment2/assets/images/1 (10).jpeg'
    },
    {
        numLikes: 11,
        numComments: 7,
        datePublished: new Date(2022, 2, 10),
        url: '../Assignment2/assets/images/1 (25).jpeg'
    },
    {
        numLikes: 8,
        numComments: 6,
        datePublished: new Date(2022, 2, 10),
        url: '../Assignment2/assets/images/1 (13).jpeg'
    },
    {
        numLikes: 8,
        numComments: 2,
        datePublished: new Date(2022, 2, 10),
        url: '../Assignment2/assets/images/1 (24).jpeg'
    },
    {
        numLikes: 2,
        numComments: 4,
        datePublished: new Date(2022, 1, 21),
        url: '../Assignment2/assets/images/1 (14).jpeg'
    },
    {
        numLikes: 6,
        numComments: 2,
        datePublished: new Date(2022, 1, 13),
        url: '../Assignment2/assets/images/1 (6).jpeg'
    },
    {
        numLikes: 6,
        numComments: 5,
        datePublished: new Date(2022, 1, 17),
        url: '../Assignment2/assets/images/1 (15).jpeg'
    },
    {
        numLikes: 0,
        numComments: 7,
        datePublished: new Date(2022, 1, 17),
        url: '../Assignment2/assets/images/1 (23).jpeg'
    },
    {
        numLikes: 41,
        numComments: 9,
        datePublished: new Date(2022, 1, 17),
        url: '../Assignment2/assets/images/1 (16).jpeg'
    },

];

var imagesDiv = document.getElementById("images")

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
    document.cookie = 'sortingPreference=' + document.getElementById('sortBySelect').selectedOptions[0].value;
    images.sort(compare);
    addImages();
}

function addImages() {
    imagesDiv.innerHTML = "";
    for (imageItem of images) {
        imagesDiv.innerHTML += '<div>' +
            '                <img src="' + imageItem.url + '">' +
            '                <div class="info">' +
            '                    <span>' +
            '                        Likes: ' + imageItem.numLikes + ', Comments: ' + imageItem.numComments + ', Date published: ' + imageItem.datePublished.toLocaleDateString("en-US") + '' +
            '                    </span>' +
            '                </div>' +
            '            </div>';
    }
}

addImages();

window.onload = function () {
    if (document.cookie != undefined && document.cookie.indexOf('sortingPreference') != -1) {
        document.getElementById("sortBySelect").value = document.cookie.split(';')[0].split('=')[1];
    }
}