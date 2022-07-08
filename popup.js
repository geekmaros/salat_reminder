import {getSalatTimes, setAlarm, getUserLocation, repeatEvery, stopAdhan} from "./utils.js";

const stopAdhanButton = document.querySelector('.stop-adhan-button');

console.log(stopAdhanButton);

stopAdhanButton.addEventListener('click', () => {
    // sendMessage({type: 'stop', payload: 'Stop adhan'})
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(error => console.log(error));
    stopAdhan();
});


const {city, country_name} = await getUserLocation()

const data = await getSalatTimes(city, country_name);

repeatEvery(setAlarm, 60000, data);