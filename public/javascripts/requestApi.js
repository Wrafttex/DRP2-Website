//test data packet
//apiCall({job: "test"}).then(result => { console.log(result); });


/*async function apiTest() {
    let result;
    for (let i = 0; i < 3; i++) {
        result = await apiCall({job: "mysqlQuery", albumName: "testAlbum"});
        console.log(result);
    }
}
apiTest();*/

apiCall({job: "mysqlLogin", userName: "Admin", password: "Admin"}).then(result => { console.log(result); });

//working image uploade data
/*apiCall({
    job: "imageUploade",
    imageName: "testImage",
    imageData: base64.substring(23)
})*/

//apiCall({job: "mysqlCreate"});

//apiCall({job: "mysqlDelete"});

//insert new album array
//apiCall({job: "mysqlInsert", albumName: "testAlbum", imageArray: ["ing1.jpg", "image2.jpg"]});

//update album array
//apiCall({job: "mysqlUpdate", albumName: "testAlbum", imageArray: ["ing2.jpg", "image3.jpg"]});

//get table
//apiCall({job: "mysqlQuery", albumName: "testAlbum"});

//login
//apiCall({job: "mysqlLogin", userName: "Admin", password: "Admin"});

//api call logging respnse
/**function apiCall(data) {
    fetch('/api', { method: 'POST', head: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(async respons => {
        respons = await respons.json();
        return respons.body;
    })
}*/

async function apiCall(data) {
    let respons = await fetch('/api', { method: 'POST', head: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    respons = await respons.json();
    return respons.body;
}