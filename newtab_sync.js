function getImages() {    
    return numberOfComics = parseInt($("#numberOfComics").val());
    document.getElementById("imageContainer").innerHTML = "" 
}

function getComicNumber() {
    var currentComicNumber;
    $.ajax({
        url: "http://xkcd.com/info.0.json",
        dataType: "json",
        async: false,
        success: function (input) {
            //Build a list of objects to store all needed properties.
            currentComicNumber = input.num;
        }
    })
    return currentComicNumber
}

function loadObjects(numberOfImages, totalComicNumber){
    var comicObjects = [];
    let i;
    for (i=1; i<=numberOfImages;i++){
        let j = i;
        var comicNumber;
        do{
            comicNumber = Math.floor((Math.random()*totalComicNumber) + 1)
            }while(comicNumber == 404);
        console.log(comicNumber);
        $.ajax({
            url: "http://xkcd.com/" + comicNumber + "/info.0.json",
            dataType: "json",
            async: false,
            success: function(input) {
                let objectToAppend = input;
                console.log(objectToAppend);
                comicObjects.push(objectToAppend)
            }
        })
    }
    console.log(comicObjects);
    return comicObjects;
}


function writeObjects(comicObjects){
    const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
               ];
    for (i=0; i<comicObjects.length; i++){
        let j = i;
        let dateString = ("" + monthNames[comicObjects[j].month - 1] + " " + comicObjects[j].day + ", " + comicObjects[j].year);
        document.getElementById("imageContainer").innerHTML += "<time>" + dateString + "</time><br><h2>" + comicObjects[j].safe_title + "</h2><img src=\"" + comicObjects[j].img + "\" <br><p>\"" + comicObjects[j].alt + "\"</p><hr>"
    }
}

function main(){
    var numberOfImages = getImages();
    var totalComicNumber = getComicNumber();
    var comicObjects = [];
    comicObjects = loadObjects(numberOfImages, totalComicNumber);
    comicObjects.sort(function(a,b) {
        return a.num - b.num
    });
    console.log(comicObjects);
    writeObjects(comicObjects);
}

window.onload = function () {
    document.getElementById("submitButton").addEventListener("click", function(event) {
        event.preventDefault();
        main();        
    }, false);
}