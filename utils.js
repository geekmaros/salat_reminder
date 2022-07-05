export const HELLO = 'HELLO';
export const sendMessage = async (msg) => {

    try{
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
        if(!tabs.length) return ('No active tab found');
         chrome.tabs.sendMessage(tabs[0].id, msg, (response) => {
            if(response && response.payload) return response.payload;
            return response;
        });
    }catch (e) {
        return  e || chrome.runtime.lastError;
    }
}