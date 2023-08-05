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


async function complete(prompt, apiKey) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey,
        },
        body: JSON.stringify({
            'prompt': prompt,
            'temperature': 0,
        })
    };
    const response = await fetch('https://api.openai.com/v1/engines/ada/completions', requestOptions);
    const data = await response.json();
    return data.choices[0].text;

}