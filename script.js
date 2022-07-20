
let utils = {};
(async () => {
    const utilsSrc = chrome.runtime.getURL('utils.js');
    utils = await import(utilsSrc);
    console.log(utils)


    // setInterval(utils.compareApiTimeWithLocalTime(12), 1000)
})()


chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
if(request.type === utils.HELLO){
    console.log(request.payload, 'from trigger');
    sendResponse({payload: 'got a ping and here is your response'});
    // sendResponse({payload: 'Adhan stopped'});
}
});
