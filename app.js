import { isValid } from './monitor.js';

// <!-- document.getElementById("mask").children[0].style.opacity = "0"; -->

document.addEventListener('DOMContentLoaded', function () {
    const apiKeyInput = document.getElementById('apiKey');
    const promptInput = document.getElementById('prompt');
    const submitButton = document.getElementById('submit');
    const responseDiv = document.getElementById('response');

    loadApiKey();

    submitButton.addEventListener('click', async function () {
        submitButton.disabled = true;


        // Call the complete function and put the result in the response field
        const results = await isValid(promptInput.value, apiKeyInput.value);
        // check if all results are true
        const result = Object.values(results).every(x => x);
        const reasons = Object.keys(results).filter(x => !results[x]);

        // Evaluate the code in the prompt
        if (result) {
            try {
                eval(promptInput.value);
                responseDiv.textContent = "Code was considered safe and executed successfully";
            } catch (e) {
                console.log(e);
                responseDiv.textContent = "Code failed to execute";
            }
        } else {
            responseDiv.textContent = "Code was considered unsafe by " + reasons.join(", ");
        }

        submitButton.disabled = false;
    });
});

async function loadApiKey() {
    const apiKeyInput = document.getElementById('apiKey');
    const response = await fetch('api_key.txt');
    if (!response.ok) return; // halt function if fetch failed
    const data = await response.text();
    if (!data) return; // halt function if no data returned
    apiKeyInput.value = data;
}
