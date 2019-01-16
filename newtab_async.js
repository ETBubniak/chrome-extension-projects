function getComicNumber() {
    return new Promise(function(resolve, reject) {
        return new Promise(function(resolve, reject){
            var req = new XMLHttpRequest();
            req.open('GET', "http://xkcd.com/info.0.json");
            
            req.onload = function() {
                if (req.status == 200) {
                    resolve(JSON.parse(req.response));
                }
                else {
                    reject(Error(req.statusText));
                }
            };
            
            req.onerror = function() {
                reject(Error("Network error"));
            };
            
            req.send();
        })
        .then(
            function fulfilled(data) {
                var currentComicNumber = data.num;
                resolve(currentComicNumber);   
            },
            function rejected(err) {
                console.log(err);
            });
    });
}

function loadObjects(totalComicNumber){

    function loadUrls(numberOfImages) {
        const urlsToReturn = [];
        for (i=1; i <= numberOfImages; i++){
            let url;
            var comicNumber;
            do{
                comicNumber = Math.floor((Math.random()*totalComicNumber) + 1)
                }while(comicNumber == 404);
            urlsToReturn.push("http://xkcd.com/" + String(comicNumber) + "/info.0.json");
        }
        return urlsToReturn;
    }
    
    function loadPromises(arrayOfUrls) {
        var promiseArray = [];
        var urlsToIterateOver = arrayOfUrls;
        for (let url of urlsToIterateOver){
            var p = new Promise(function(resolve, reject) {
                var req = new XMLHttpRequest();
                req.open('GET', url);
                req.onload = function() {
                    if (req.status == 200) {
                        resolve(JSON.parse(req.response));
                    }
                    else {
                        reject(Error(req.statusText));
                    }
                };
                req.onerror = function() {
                    reject(Error("Network error"));
                };
                req.send();
            });
            promiseArray.push(p);  
        }
        return promiseArray;
    }



    numberOfImages = parseInt(document.getElementById("numberOfComics").value);
    document.getElementById("imageContainer").innerHTML = "";
    const arrayOfUrls = loadUrls(numberOfImages);
    arrayOfPromises = loadPromises(arrayOfUrls);
    return Promise.all(arrayOfPromises)
}

function sortObjects(comicObjects){
    newComicObjects = comicObjects.sort(function(a,b) {
            return a.num - b.num;
            });
    return newComicObjects;
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
    getComicNumber()
        .then(
            function fulfilled(data) {
                console.log(data);
                const totalComicNumber = data;
                return loadObjects(totalComicNumber);   
            },
            function rejected(err) {
                console.log(err);
            })
        .then(
            function fulfilled(data) {
                console.log(data);
                const comicObjects = data;
                return sortObjects(comicObjects);   
            },
            function rejected(err) {
                console.log(err);
            })
        .then(
            function fulfilled(data) {
                console.log(data);
                const comicObjects = data;
                return writeObjects(comicObjects);   
            },
            function rejected(err) {
                console.log(err);
            });
}


window.onload = function () {
    document.getElementById("submitButton").addEventListener("click", function(event) {
        event.preventDefault();
        main();        
    }, false);
}
