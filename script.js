
// (async () => {
//     const utilsSrc = chrome.runtime.getURL('utils.js');
//     console.log(utilsSrc);
// })()
//
//


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
if(request.type === 'hello'){
    console.log(request.payload);
    sendResponse('from scrptjs')
}
});