let i;
for (i = 0; i<=4; i++)
{
let j = i;
var comicnumber = Math.floor((Math.random()*2080) + 1);

$.ajax({
    url: "http://xkcd.com/" + comicnumber + "/info.0.json",
    dataType: "json",
    success: function(input) {
        $("#xkcdimg" + String(j) + "").html("<img src = \"" + input.img + "\" />");
        console.log(input.img);
        console.log("#xkcdimg" + String(j) + "")
    }
})

}