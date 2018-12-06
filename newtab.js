var currentComicNumber;

$.ajax({
    url: "http://xkcd.com/info.0.json",
    dataType: "json",
    success: function(input) {
        currentComicNumber = input.num;
        console.log(currentComicNumber);
        let i;
        for (i = 0; i<=4; i++) {
            let j = i;
            var comicNumber = Math.floor((Math.random()*currentComicNumber) + 1);
            $.ajax({
                url: "http://xkcd.com/" + comicNumber + "/info.0.json",
                dataType: "json",
                success: function(input) {
                    $("#xkcdimg" + String(j) + "").html("<img src = \"" + input.img + "\" />");
                }
            })
        //console.log(input.img);
        //console.log("#xkcdimg" + String(j) + "")
        }
    }
});

