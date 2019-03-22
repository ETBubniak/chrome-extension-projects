function getImages() {    
    return numberOfComics = parseInt(document.getElementById("numberOfComics").value);
    document.getElementById("imageContainer").innerHTML = "" 
}

function getComicNumber() {
    let currentComicNumber = null;
    let err = null;
    var req = new XMLHttpRequest();
    req.open("GET", "http://xkcd.com/info.0.json", false);

    req.onload = () => {
        if (req.status == 200){
            currentComicNumber = JSON.parse(req.response).num;
            console.log(currentComicNumber)
        }
        else {
             err = new Error(req.statusText);
        }
    };

    req.onerror = () => {
        err = new Error("Network Error");
    };

    req.send()
    if (currentComicNumber) {
        return currentComicNumber;
    }
    else {
        return err;
    }
}

function loadObjects(numberOfImages, totalComicNumber){
    console.log(numberOfImages, totalComicNumber);
    var comicObjects = [];
    let err = null;
    let i;
    for (i=1; i<=numberOfImages;i++){
        let req = new XMLHttpRequest();
        let j = i;
        var comicNumber;
        do{
            comicNumber = Math.floor((Math.random()*totalComicNumber) + 1)
            }while(comicNumber == 404);
        console.log(comicNumber);
        req.open("GET", "http://xkcd.com/" + String(comicNumber) + "/info.0.json", false);

        req.onload = () => {
            if (req.status == 200){
                let objectToAppend = JSON.parse(req.response);
                comicObjects.push(objectToAppend);                           
            }
            else {
                err = new Error(req.statusText);
            }
        };

        req.onerror = () => {
            err = new Error("Network error");
        }

        req.send();

    }
    if (!err) {
        return comicObjects;
    }
    return err;
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
    const numberOfImages = getImages();
    const totalComicNumber = getComicNumber();
    const comicObjects = loadObjects(numberOfImages, totalComicNumber).sort(function(a,b) {
        return a.num - b.num
    });
    writeObjects(comicObjects);
}

window.onload = function () {
    document.getElementById("submitButton").addEventListener("click", function(event) {
        event.preventDefault();
        main();        
    }, false);
}