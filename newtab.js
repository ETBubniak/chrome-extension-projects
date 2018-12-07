function getImages() {    
    const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                       ];
    var numberOfComics = parseInt($("#numberOfComics").val());
    document.getElementById("imageContainer").innerHTML = "";
    var currentComicNumber;
    (function(){
        $.ajax({
            url: "http://xkcd.com/info.0.json",
            dataType: "json",
            success: function (input) {
                
                //Build a list of objects to store all needed properties.
                currentComicNumber = input.num;
                var comicObjects = [];
                let i;
                for (i=1; i<=numberOfComics;i++){
                    let j = i;
                    var comicNumber = Math.floor((Math.random()*currentComicNumber) + 1);
                    $.ajax({
                        url: "http://xkcd.com/" + comicNumber + "/info.0.json",
                        dataType: "json",
                        async: false,
                        success: function(input) {
                            let objectToAppend = input;
                            comicObjects.push(objectToAppend); 
                        }
                    })
                }
                comicObjects.sort(function(a,b) {
                    return a.num - b.num
                });
                console.log(comicObjects);
                console.log(comicObjects.length);
                for (i=0; i<comicObjects.length; i++){
                    console.log("completed");
                    let j = i;
                    let dateString = ("" + monthNames[comicObjects[j].month] + " " + comicObjects[j].day + ", " + comicObjects[j].year);
                    document.getElementById("imageContainer").innerHTML += dateString +  "<br><img src=\"" + comicObjects[j].img + "\" <br><p>\"" + comicObjects[j].alt + "\"</p><hr>"
                }
            }
        })
    })();

}


window.onload = function () {
    document.getElementById("submitButton").addEventListener("click", function(event) {
        event.preventDefault();
        getImages()
    }, false);
}
/* function getImages() {
    
    var numberOfComics = parseInt($("#numberOfComics").val());
    var currentComicNumber;
    document.getElementById("imageContainer").innerHTML = "";
    console.log('function began running');
    console.log('number of images is ' + numberOfComics);
    $.ajax({
        url: "http://xkcd.com/info.0.json",
        dataType: "json",
        success: function(input) {
            let i;
            currentComicNumber = input.num;
            for (i = 1; i<=numberOfComics; i++) {
                let j = i;
                var comicNumber = Math.floor((Math.random()*currentComicNumber) + 1);
                $.ajax({
                    url: "http://xkcd.com/" + comicNumber + "/info.0.json",
                    dataType: "json",
                    success: function(input) {
                        document.getElementById("imageContainer").innerHTML += "<img src=\"" + input.img + "\" <br><p>\"" + input.alt + "\"</p><hr>"; 
                    }
                })
            //console.log(input.img);
            //console.log("#xkcdimg" + String(j) + "")
            }
        }
    });
}


window.onload = function () {
    document.getElementById("submitButton").addEventListener("click", function(event) {
        event.preventDefault();
        getImages()
    }, false);
} */