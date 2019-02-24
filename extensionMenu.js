function getTargetFolderID() {
    const newsFolderID = 110;
    return String(newsFolderID);
}

function getContentsOfFolder(folderID){
    const ID = folderID;
    chrome.bookmarks.getChildren(ID,
        (results) => {
            return results;
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
    const randomIndex = Math.floor((Math.random()*urlResults.length) + 1)
    const urlToAdd = urlResults[randomIndex].url;
    return urlToAdd;
}

function getUrlsfromFolder(folderID){
    const urlsToReturn = [];
    const results = getContentsOfFolder(folderID);
    const [urlResults, folderResults] = separateIntoUrlsAndFolders(results);
    urlsToReturn.push(getUrlFromUrlResults(urlResults));
    for (let folder in folderResults){
        urlsToReturn = urlsToReturn.concat(getUrlsfromFolder(folder.id))
    }
    return urlsToReturn;
}

function openBookmarks(urlsToOpen){
    for (let url of arrayOfUrls){
        chrome.tabs.create({
            "url": url 
        });
    }
}

function main() {
    const newsFolderID = getTargetFolderID();
    const urlsToOpen = [];
    urlsToOpen = urlsToOpen.concat(getUrlsfromFolder(newsFolderID));
    openBookmarks(urlsToOpen);
}

window.onload = () => {
    document
    .getElementById("openBookmarks")
    .addEventListener("click", function(event){
        event.preventDefault();
        main();
    });
}