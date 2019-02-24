function createLinksFromBookmarks(folderId){
    const linksToReturn = [];
    chrome.bookmarks.getChildren(folderId,
        (results) => {
            const arrayOfResults = results;
            console.log(arrayOfResults);
            const arrayOfUrlResults = arrayOfResults.filter(
                (result) => {
                    return ('url' in result)
                }
            );
            const arrayOfFolderResults = arrayOfResults.filter(
                function(result) {
                    return !('url' in result)
                }
            );
            console.log(arrayOfUrlResults);
            console.log(arrayOfFolderResults);
        });
}

function openBookmarks(arrayOfUrls){
    for (let url of arrayOfUrls){
        chrome.tabs.create({
            "url": url 
        });
    }
}

function printBookmarks(id) {
    chrome.bookmarks.get(id,
        (results) => {
            console.log(results);
            console.log("id = " + results[0].id + ", title = " + results[0].title);
        });
    chrome.bookmarks.getChildren(id,
        (results) => {
            console.log(results);
            for (let result in results) {
                console.log("id = " + result.id + ", title = " + result.title);
            }
        });
}

function printBookmarksRecursively(id) {
    console.log("fired function printBookmarks, id = " + id);
    chrome.bookmarks.get(id, (results) => {
        console.log("id = " + results[0].id + ", title = " + results[0].title);
        console.log(results);
    });
    chrome.bookmarks.getChildren(id, (results) => {
        console.log(results);
        for (let result of results) {
            printBookmarks(result.id);
        }
    });

}

window.onload = function () {
    bookmarksBarId = "1";
    newsFolderId = "110";
    document
    .getElementById("openBookmarks")
    .addEventListener("click", function(event){
        event.preventDefault();
        createLinksFromBookmarks(newsFolderId);
        // openBookmarks(arrayOfUrlsToOpen);
    });
    document
    .getElementById("betaConsoleLogBookmarks")
    .addEventListener("click", function(event){
        event.preventDefault();
        printBookmarks(newsFolderId);
    });
}