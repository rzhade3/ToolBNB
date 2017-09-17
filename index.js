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

app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('index.pug');
});

app.get('/login', (req, res) => {
	res.render('login.pug');
});

// Change this so it authenticates the user
app.post('/login', (req, res) => {
	res.redirect('/');
});

app.get('/signup', (req, res) => {
	res.send("This is the signup page");
});

// Change this so it signs the user in
app.post('/signup', (req, res) => {
	res.redirect('/');
});

app.get('/profile', (req, res) => {
	res.send("This is the profile page");
});

app.get('/')

console.log("Hello world");
app.listen(port);