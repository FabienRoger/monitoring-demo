import { isValid, evaluate } from './monitor.js';

// <!-- document.getElementById("mask").children[0].style.opacity = "0"; -->

document.addEventListener('DOMContentLoaded', function () {
    const apiKeyInput = document.getElementById('apiKey');
    const promptInput = document.getElementById('prompt');
    const submitButton = document.getElementById('submit');
    const responseDiv = document.getElementById('response');
    const evaluateButton = document.getElementById('evaluate');
    const loadbar = document.getElementById('loadbar');
    const evalResponse = document.getElementById('evalResponse');

    loadApiKey();

    submitButton.addEventListener('click', async function () {
        submitButton.disabled = true;


        // Call the complete function and put the result in the response field
        const results = await isValid(promptInput.value, apiKeyInput.value);
        // check if all results are true
        const result = results.every(x => x.result);
        const reasons = results.filter(x => !x.result).map(x => x.name);

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

    evaluateButton.addEventListener('click', async function () {
        const results = await evaluate('js_examples_10.json', apiKeyInput.value, function (progress) {
            loadbar.style.width = `${progress * 100}%`;
        });
        loadbar.style.width = `0%`;
        console.log(results);
        const evalResponseText = `The false positive rate is ${roundedPrecentage(results.fp_rate)}<br/><br/>` + results.method_fp_rate.map(x => `${x.name} has a false positive rate of ${roundedPrecentage(x.fp_rate)} and the false positive rate when leaving out this method is ${roundedPrecentage(x.left_out_fp_rate)}`).join("<br/>");
        evalResponse.innerHTML = evalResponseText;
        console.log(evalResponse);
    });
});

function roundedPrecentage(num, decimalPlaces = 2) {
    let factor = Math.pow(10, decimalPlaces);
    let percentage = Math.round(100 * num * factor) / factor;
    return `${percentage}%`
}

async function loadApiKey() {
    const apiKeyInput = document.getElementById('apiKey');
    const response = await fetch('api_key.txt');
    if (!response.ok) return; // halt function if fetch failed
    const data = await response.text();
    if (!data) return; // halt function if no data returned
    apiKeyInput.value = data;
}