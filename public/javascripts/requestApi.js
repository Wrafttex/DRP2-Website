const data = {
    job: "test",
    data: 32,
}
const options = {
    method: 'POST',
    head: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}

fetch('/api', options).then( async respons => {
    respons = await respons.json();
    console.log(respons.body.status);
});