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
    const {data} = await response.json();
    return {
        timings: data.timings,
        greg: data.date.gregorian,
        hijri: data.date.hijri,
    };
}

export const getUserLocation = async () => {
    const url = 'https://ipapi.co/json/';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
//
// export const compareApiTimeWithLocalTime = (api_time) => {
//
//
//     const now = new Date();
//     const userCurrentTime = now.toLocaleString('default', {
//         hour: '2-digit',
//         minute: '2-digit',
//     })
//
//     if(userCurrentTime === api_time) {
//         console.log('it is time to pray');
//     }
//     console.log('it is not time to pray');
// }

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}




export const  startTime = (data) => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    // let s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    const timeGan = h + ":" + m;

    // const stringTime = timeGan.toString();

     const stringTime = "19:06"

    Object.entries(data.timings).forEach(([key, value]) => {
        if(stringTime == value.toString()) {
            console.log('it is time to pray');
            // playSound()
        }

    });

    const t = setTimeout(function () {
        startTime(data)
    }, 5000);
}

export const  playSound = (name) => {
    let audio = new Audio ("sounds/azan1.mp3");
    audio.play();
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
    const timeGan = getRealTime();
    const timeObj = Object.values(time).includes(timeGan);
    if(timeObj) {
        console.log('it is time to pray');
        playSound()
    }
    else{
        console.log('it is not time to pray');
    }
}

// watch changes in time    and set alarm
export const watchTime = (data) => {
    const t = setTimeout(function setAlarm(){


            const time = data.timings;
            const timeGan = getRealTime();
            const timeObj = Object.values(time).includes(timeGan);
            if(timeObj) {
                console.log('it is time to pray');
                playSound()
            }
            else{
                console.log('it is not time to pray');
            }
    }, 60000);

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


