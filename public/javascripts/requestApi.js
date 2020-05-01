//test data packet
//apiCall({ job: "updateData", albumName: "testAlbum", imageArray: ["Test1.jpg", "Test2.jpg", "Test3.jpg", "Test4.jpg", "Test5.jpg"] }).then(result => { console.log(result); });


/*async function apiTest() {
    let result;
    for (let i = 0; i < 3; i++) {
        result = await apiCall({job: "getData", albumName: "testAlbum"});
        console.log(result);
    }
}
apiTest();*/

// apiCall({
//     job: "Login",
//     userName: "Admin",
//     password: "Admin"
// }).then(result => {
//     console.log(result);
// });

//working image uploade data
/*apiCall({
    job: "imageUploade",
    imageName: "testImage",
    imageData: base64.substring(23)
})*/

//insert new album array
// apiCall({
//     job: "insertData",
//     albumName: "testAlbum",
//     imageArray: TestAlbumImages
// });

//update album array
// apiCall({
//     job: "updateData",
//     albumName: "testAlbum",
//     imageArray: ["/images/Test1.jpg",
//         "/images/Test2.jpg",
//         "/images/Test3.jpg",
//         "/images/Test4.jpg",
//         "/images/Test5.jpg",
//         "/images/Test5.jpg",
//         "/images/Test5.jpg"
//     ]
// });

//get table
//apiCall({job: "getData", albumName: "testAlbum"});

//login
//apiCall({job: "Login", userName: "Admin", password: "Admin"});

//api call
async function apiCall(data) {
    console.log(data);
    let respons = await fetch('/api', {
        method: 'POST',
        head: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    respons = await respons.json();
    return respons.body;
}