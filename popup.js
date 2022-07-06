import {getSalatTimes, sendMessage, getUserLocation, startTime} from "./utils.js";

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

const times = await  getSalatTimes(city, country_name);

startTime()