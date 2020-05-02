//test data packet
//apiCall({job: "test"}).then(result => { console.log(result); });


/*async function apiTest() {
    let result;
    for (let i = 0; i < 3; i++) {
        result = await apiCall({job: "getData", albumName: "testAlbum"});
        console.log(result);
    }
}
apiTest();*/

apiCall({job: "Login", username: "Admin", password: "Admin"}).then(result => { console.log(result); });

//working image uploade data
/*apiCall({
    job: "imageUpload",
    imageName: "testImage",
    imageData: base64.substring(23)
})*/

//insert new album array
//apiCall({job: "insertData", albumName: "testAlbum", imageArray: ["ing1.jpg", "image2.jpg"]});

//update album array
//apiCall({job: "updateData", albumName: "testAlbum", imageArray: ["ing2.jpg", "image3.jpg"]});

//get table
//apiCall({job: "getData", albumName: "testAlbum"});

//login
//apiCall({job: "login", username: "Admin", password: "Admin"});

//api call
async function apiCall(data) {
    let respons = await fetch('/api', { method: 'POST', head: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    respons = await respons.json();
    return respons.body;
}