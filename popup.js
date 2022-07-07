import {getSalatTimes, sendMessage, setAlarm, getUserLocation, startTime, watchTime, repeatEvery} from "./utils.js";

const stopAdhanButton = document.querySelector('.stop-adhan-button');

console.log(stopAdhanButton);

stopAdhanButton.addEventListener('click', () => {
    sendMessage({type: 'hello', payload: 'from popup.js'})
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
});

const {city, country_name} = await getUserLocation()

const data = await getSalatTimes(city, country_name);


// setAlarm(data);

// watchTime(data)


repeatEvery(setAlarm, 60000, data);