function getInput() {
    const tabRangeInput = document.getElementById("tabRange").value;
    return String(tabRangeInput);
}

function removeSpaces(tabRangeInput){
    const formattedTabRangeInput = tabRangeInput.split(' ').join('');
    return formattedTabRangeInput;
}

// 
function inputToArray(formattedTabRangeInput, separator) {
    const splitInput = formattedTabRangeInput.split(separator);
    return splitInput;
}

function handleSingle(formattedTabRangeInput){
    const tabArray = [];
    tabArray.push(Number(formattedTabRangeInput));
    return tabArray;

}

function rebuildElementAsArray(lower, higher){
    const rebuiltArray = [];
    for (i = lower; i <= higher; i++) {
        rebuiltArray.push(i);
        }
    return rebuiltArray;
}

function expandElement(elementSplitAsArray){
    var expandedElement = [];
    if (elementSplitAsArray[0] < elementSplitAsArray[1]) {
        const lower = elementSplitAsArray[0];
        const higher = elementSplitAsArray[1];
        expandedElement = expandedElement.concat(rebuildElementAsArray(lower, higher));
    }
    else if (elementSplitAsArray[0] > elementSplitAsArray[1]){
        const lower = elementSplitAsArray[1];
        const higher = elementSplitAsArray[0];
        expandedElement = expandedElement.concat(rebuildElementAsArray(lower, higher))
    }
    else if (elementSplitAsArray[0] == elementSplitAsArray[1]) {
        expandedElement.push(elementSplitAsArray[0]);
    }

    return expandedElement;
    
}
function regexHandler(inputElement){
    var returnArray = [];
    const regex = /\d+-\d+/;
    if (regex.test(inputElement)){
        const elementSplitAsArray = inputElement.split('-').map(Number);
        returnArray = returnArray.concat(expandElement(elementSplitAsArray));
    }
    else {
        returnArray.push(Number(inputElement));
    }
    return returnArray;
}

function expandArray(tabArray){
    var expandedArray = [];
    for (element of tabArray) {
        let arrayToConcatenate = regexHandler(element);
        expandedArray = expandedArray.concat(arrayToConcatenate);
    }
    return expandedArray;
}

function handleMultiple(formattedTabRangeInput, separator){
    const tabArray = inputToArray(formattedTabRangeInput, separator);
    const expandedInput = expandArray(tabArray);
    return expandedInput;
}

function containsMultipleNumbers(formattedTabRangeInput) {
    return (formattedTabRangeInput.includes(',') || formattedTabRangeInput.includes('-'));
}

function getTabIndices(formattedTabRangeInput){
    const separator = ',';
    var tabIndices = [];
    if (containsMultipleNumbers(formattedTabRangeInput)) {
        tabIndices = tabIndices.concat(handleMultiple(formattedTabRangeInput, separator));
    }
    else {
        tabIndices = tabIndices.concat(handleSingle(formattedTabRangeInput));
    }
    return tabIndices.map((index) => {return (index-1);});
}

//This function is async.
function queryTabFromIndex(index){
    return new Promise((resolve, reject) =>{
        chrome.tabs.query({
            "currentWindow": true,
            "index": index,
        }, (tab) => {resolve(tab[0].id);});
    });
}

// This function is async because it calls queryTabFromIndex.
async function getIdsFromIndices(tabIndices) {
    const tabIds = [];
    for (index of tabIndices) {
        let tabId;
        tabId = await queryTabFromIndex(index);
        tabIds.push(tabId);
    }
    return tabIds;
}

function closeWindow(){
    chrome.tabs.query({
        "currentWindow": true
    }, (tabs) => {
        for (tab of tabs){
            chrome.tabs.remove(tab.id)
        }
    });
}

function closeTabs(tabIds){
    chrome.tabs.remove(tabIds);
}

async function main() {
    const tabRangeInput = getInput();
    if (tabRangeInput === "all"){
        closeWindow();
    }
    else {
        const formattedTabRangeInput = removeSpaces(tabRangeInput);
        const tabIndices = getTabIndices(formattedTabRangeInput);
        const tabIds = await getIdsFromIndices(tabIndices);
        closeTabs(tabIds);        
    }
}

window.onload = () => {
    document
    .getElementById("closeTabsFromRange")
    .addEventListener("click", function(event){
        event.preventDefault();
        main();
    });
}