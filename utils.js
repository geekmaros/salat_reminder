export const HELLO = 'HELLO';
export const azahURL = 'https://res.cloudinary.com/geekmaros/video/upload/v1657300294/azan1.mp3'
let count = 0;
let audio = new Audio ();
audio.src = azahURL;

export const sendMessage = async (msg) => {

        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })

    return new Promise((resolve, reject) => {
        if (!tabs.length) reject('No active tab found');

        chrome.tabs.sendMessage(tabs[0].id, msg, (response) => {
            if(chrome.runtime.lastError) reject(chrome.runtime.lastError);
            if (response && response.payload) resolve(response.payload);
            reject ('no response');
        });

    });
}

//Fetch salat `times` from API
export const getSalatTimes = async (city, country) => {
   try {
       const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=8`;
       const response = await fetch(url);
       const {data} = await response.json();
       return {
           timings: data.timings,
           greg: data.date.gregorian,
           hijri: data.date.hijri,
       };
   }catch (e) {
       console.log(e, "Unable get salat times");
   }
}
//Get user location
export const getUserLocation = async () => {
   try{
       const url = 'https://ipapi.co/json/';
       const response = await fetch(url);
       const data = await response.json();
       return data;
   }catch (e) {
       console.log(e, "Unable get user location");
   }
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


export const  playAdhan = () => {
    if(count === 0){
        count = 1;
        audio.play();
    }else {
        count = 0;
        console.log('stopping adhan...')
        audio.pause();
        audio.currentTime = 0;
    }
}

export const stopAdhan = () => {
    playAdhan()
    audio.pause();
    audio.currentTime = 0;
}





// return realtime time
export const getRealTime = () => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    // let s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    const timeGan = h + ":" + m;
    return timeGan;
}


// setAlarm
export const setAlarm = (data) => {
    const time = data.timings;

    //the time variable is for testing purposes
    // const time = {
    //     asr: '1:45',
    //     dhur: '19:18',
    // }
    const timeGan = getRealTime();
    const timeObj = Object.values(time).includes(timeGan);
    if(timeObj) {
        console.log('its time to pray');
        playAdhan()
    }else {
        console.log('not time to pray');
    }
}

export const repeatEvery = (func, interval, data) => {
    // Check current time and calculate the delay until next interval
    let now = new Date(),

        delay = interval - now % interval;

    function start() {
        // Execute function now...
        setAlarm(data);
        // ... and every interval
        setInterval(function(){
            setAlarm(data);
        }, interval);
    }

    // Delay execution until it's an even interval
    setTimeout(start, delay);
}


