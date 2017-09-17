const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const path = require('path');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(bodyParser());

// Self explanatory
const firebase = require('firebase');

var config = {
	apiKey: "AIzaSyDIxa9FVPfPux7huZCP6zVrOX6ylVGPpGo",
	authDomain: "homedepot-96042.firebaseapp.com",
	databaseURL: "https://homedepot-96042.firebaseio.com",
	storageBucket: "homedepot-96042.appspot.com",
};
firebase.initializeApp(config);

app.get('/', (req, res) => {
	res.send("Hello world");
});

app.get('/login', (req, res) => {
	
});

console.log("Hello world");
app.listen(port);