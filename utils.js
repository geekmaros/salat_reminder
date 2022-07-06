export const HELLO = 'HELLO';
export const sendMessage = async (msg) => {

    try{
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
        if(!tabs.length) return ('no active tab');
         chrome.tabs.sendMessage(tabs[0].id, msg, (response) => {
            if(response && response.payload) return response.payload;
            return response.payload;
        });
    }catch (e) {
        return  e || chrome.runtime.lastError;
    }
}

export const getSalatTimes = async () => {
    let city = 'ilorin';
    let country = 'Nigeria';
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

