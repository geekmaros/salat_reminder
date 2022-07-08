
let utils = {};
(async () => {
    const utilsSrc = chrome.runtime.getURL('utils.js');
    utils = await import(utilsSrc);
    console.log(utils)


    // setInterval(utils.compareApiTimeWithLocalTime(12), 1000)
})()


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    console.log(request.type)
if(request.type === 'stop'){
    console.log(request.payload);
    sendResponse({payload: 'got a ping and here is your response'});
    sendResponse({payload: 'Adhan stopped'});
}
});
