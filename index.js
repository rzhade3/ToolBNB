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
	messagingSenderId: "691782900832"
};
firebase.initializeApp(config);

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/login', (req, res) => {
	res.render('login');
});

// Change this so it authenticates the user
app.post('/login', (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
		return res.redirect('/profile');
	}, (error) => {
		return res.render('login');
	});
});

app.get('/logout', (req, res) => {
	firebase.auth().signOut();
	res.redirect('/');
});

app.get('/signup', (req, res) => {
	res.render("signup");
});

// Change this so it signs the user in
app.post('/signup', (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
		res.redirect('/login');
	}, (error) => {
		res.render('signup');
	});
});

app.get('/profile', (req, res) => {
	res.send("This is the profile page");
});

app.get('/borrow', (req, res) => {
	res.render('borrow');
});

app.get('/lend', (req, res) => {
	res.send("lend");
});

app.post('/lend', (req, res) => {
	var category = req.body.category;
	var size = req.body.size;
	var location = req.body.size;
})

console.log("Hello world");
app.listen(port);