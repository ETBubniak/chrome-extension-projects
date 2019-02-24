function getTargetFolderID() {
    const newsFolderID = 110;
    return String(newsFolderID);
}

// this function returns a Promise and so should be considered async.
function getContentsOfFolder(folderID){
    return new Promise(function(resolve, reject) {
        chrome.bookmarks.getChildren(folderID,
            (results) => {
                resolve(results);
            });
    });

}

function separateIntoUrlsAndFolders(results){
    const urlResults = results.filter(
        (result) => {
            return ('url' in result)
        }
    );
    const folderResults = results.filter(
        function(result) {
            return !('url' in result)
        }
    );
    return [urlResults, folderResults];
}

function getUrlFromUrlResults(urlResults){
    const randomIndex = Math.floor((Math.random()*urlResults.length));
    const urlToAdd = urlResults[randomIndex].url;
    return urlToAdd;
}

// this function returns a Promise and is async.
// it resolves to the list of URLs to return.
function getUrlsfromFolder(folderID){
    const urlsToReturn = [];
    return new Promise(function(resolve, reject) {
        getContentsOfFolder(folderID)
        .then(function fulfilled(results) {
            const [urlResults, folderResults] = separateIntoUrlsAndFolders(results);
            urlsToReturn.push(getUrlFromUrlResults(urlResults));
            resolve(urlsToReturn);
        });
    });

    /*
    const urlsToReturn = [];
    getContentsOfFolder(folderID)
        .then(function fulfilled(results){
            const [urlResults, folderResults] = separateIntoUrlsAndFolders(results);
            urlsToReturn.push(getUrlFromUrlResults(urlResults));
            for (let folder in folderResults){
                urlsToReturn = urlsToReturn.concat(getUrlsfromFolder(folder.id))
            }
            return urlsToReturn;
        })
    */
}

function openBookmarks(urlsToOpen){
    for (let url of urlsToOpen){
        chrome.tabs.create({
            "url": url 
        });
    }
}

function main() {
    const newsFolderID = getTargetFolderID();
    getUrlsfromFolder(newsFolderID)
        .then(function fulfilled(urlsToOpen){
            openBookmarks(urlsToOpen);
        })
}

window.onload = () => {
    document
    .getElementById("openBookmarks")
    .addEventListener("click", function(event){
        event.preventDefault();
        main();
    });
}