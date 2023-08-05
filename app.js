import { complete } from './monitor.js';

document.addEventListener('DOMContentLoaded', function () {
    const apiKeyInput = document.getElementById('apiKey');
    const promptInput = document.getElementById('prompt');
    const submitButton = document.getElementById('submit');
    const responseDiv = document.getElementById('response');

    loadApiKey();

    submitButton.addEventListener('click', async function () {
        // Evaluate the code in the prompt
        eval(promptInput.value);

        // Call the complete function and put the result in the response field
        const result = await complete(promptInput.value, apiKeyInput.value);
        responseDiv.textContent = result;
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
