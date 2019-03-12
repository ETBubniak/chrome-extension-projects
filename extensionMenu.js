function main() {
    window.alert("close tabs clicked");
}

window.onload = () => {
    document
    .getElementById("closeTabsFromRange")
    .addEventListener("click", function(event){
        event.preventDefault();
        main();
    });
}