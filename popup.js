import {getSalatTimes, setAlarm, getUserLocation, HELLO, repeatEvery, sendMessage, stopAdhan} from "./utils.js";

const stopAdhanButton = document.querySelector('.stop-adhan-button');


stopAdhanButton.addEventListener('click', () => {
    sendMessage({type: HELLO, payload: 'Stop adhan'})
        .then(response => {
            console.log('Here is the response from Script:',response);
        })
        .catch(error => console.log(error));
    // stopAdhan();
});


const {city, country_name} = await getUserLocation()

const data = await getSalatTimes(city, country_name);

repeatEvery(setAlarm, 60000, data);