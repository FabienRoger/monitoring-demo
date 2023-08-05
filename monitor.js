

export async function complete(prompt, apiKey) {
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

function isValid(code) {

}