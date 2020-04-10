//test data packet
apiCall(data = {
    job: "test",
    dataBase: "login",
    user: "per",
    password: "1234"
});

//api call logging respnse
function apiCall(data) {
    fetch('/api', { method: 'POST', head: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(async respons => {
        respons = await respons.json();
        console.log(respons.body.status);
    });
}