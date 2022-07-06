let utils = {};
(async () => {
    const utilsSrc = chrome.runtime.getURL('utils.js');
    utils = await import(utilsSrc);
    console.log(utils)
    const time = await utils.getSalatTimes();
    console.log(time);
})()


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
if(request.type === utils.HELLO){
    console.log(request.payload);
    sendResponse({payload: 'got a ping and here is your response'});
}
});
