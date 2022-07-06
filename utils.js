export const HELLO = 'HELLO';
export const sendMessage = async (msg) => {

    try{
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
        if(!tabs.length) return ('no active tab');
         chrome.tabs.sendMessage(tabs[0].id, msg, (response) => {
            if(response && response.payload) return response.payload;
            return response;
        });
    }catch (e) {
        return  e || chrome.runtime.lastError;
    }
}

export const getSalatTimes = async (city, country) => {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=8`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const getUserLocation = async () => {
    const url = 'https://ipapi.co/json/';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const compareApiTimeWithLocalTime = (api_time) => {


    const now = new Date();
    const userCurrentTime = now.toLocaleString('default', {
        hour: '2-digit',
        minute: '2-digit',
    })

    if(userCurrentTime === api_time) {
        console.log('it is time to pray');
    }
    console.log('it is not time to pray');
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

export const  startTime = () => {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    const timeGan = h + ":" + m;

    const stringTime = timeGan.toString();

    const t = setTimeout(function () {
        startTime()
    }, 500);
}



