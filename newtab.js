function getImages() {
    
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
}