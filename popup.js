import {sendMessage} from "./utils.js";

const stopAdhanButton = document.querySelector('.stop-adhan-button');

console.log(stopAdhanButton);

stopAdhanButton.addEventListener('click', () => {
    sendMessage({type: 'hello', payload: 'from popup.js'})
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
});