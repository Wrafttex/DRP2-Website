# Web Album
Our web album is made to simplify the process of uploading and organizing pictures, in an online web album. It is made so that only one person can be the administrator, where you will have the options to reorganize and upload new images. The end result is an organized album that can be shared and exhibited to an audiance, where all the images isn't exposed to any 3. parties. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

These programs have to be installed before use.

* [Node.js](https://nodejs.org/en/download/)
* MySQL (server) or [XAMPP](ttps://www.apachefriends.org/index.html) 

### Installing

Insert your MySQL information in to the file called MySQLLogin.js 

If you don't already have a database, use database.js to create one. 
```
node database.js
```

You need to create MySQL tabels before using the program.
```
node input.js create
```

To start the program/webserver, if you want to run it on another port change that in the file.
```
node server.js
```
Now you should be able to access the webserver [http://localhost:3000/](http://localhost:3000/).

If you want to upload images to the albums, you need to login first.
```
Username: Admin
Password: Admin
```

To upload images or change the structure of the  album, go to the album in question and hit edit. When you are happy with the images/structure hit the stitch button.

## Authors

* **Casper Gislum**
* **Jacob Norlyk Kjergaard**
* **Kevin Risgaard Sinding**
* **Magni Jógvansson Hansen**
* **Mathias Vestergaard Jensen**
* **Nikolai Eriksen Kure**

## License

This project is licensed under the MIT License.

## Acknowledgments
* Thanks to [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA) for the help with the landingpage.
* Thanks to [hMatoba](https://github.com/hMatoba/) for the code to access the metadata
* And of course thanks to [Stackoverflow](https://www.Stackoverflow.com), [w3schools](https://www.w3schools.com/) and [nodejs knowledge](https://nodejs.org/en/knowledge/).

