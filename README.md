# Web Album

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

These programs have to be installed before use.

* [Node.js](https://nodejs.org/en/download/)
* MySQL (server) or [XAMPP](ttps://www.apachefriends.org/index.html) 

### Installing

Insert your MySQL information in to the file called MuSQLLogin.js 

If you don't already have a database, use database.js to create one. 
```
node database.js
```

You need to create MySQL tabels before using the program.
```
node input.js create
```

To start the program/webserver, if you want to run it on anohter port cahnge that in the file.
```
node server.js
```
Now you should be able to acces the webserver [http://localhost:3000/](http://localhost:3000/).

If you want to upload images to the albums, you need to login first.
```
Username: Admin
Password: Admin
```

To upload images or cahnge the structure of the  album, go to the album in question and hit edit. When you are happy with the images/structure hit the stitch button.

## Authors

* **Casper Gislum**
* **Jacob Norlyk Kjergaard**
* **Kevin Risgaard Sinding**
* **Magni Jógvansson Hansen**
* **Mathias Vestergaard Jensen**
* **Nikolai Eriksen Kure**

## License

MAGNI!!!! Har du noget fra metadata?
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* Thanks to [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA) for the help with the landingpage.
* MAGNI! metadata mby?
* And ofcause thanks to [Stackoverflow](https://www.Stackoverflow.com), [w3schools](https://www.w3schools.com/) and [nodejs knowledge](https://nodejs.org/en/knowledge/).

