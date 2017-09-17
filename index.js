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

var db = firebase.database();

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index', {user: checkUser()});
});

app.get('/login', (req, res) => {
	res.render('login', {user: checkUser()});
});

app.post('/login', (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
		return res.redirect('/profile');
	}, (error) => {
		return res.render('login', {user: checkUser(), errorMessage: error.message});
	});
});

app.get('/logout', (req, res) => {
	firebase.auth().signOut();
	res.redirect('/');
});

app.get('/signup', (req, res) => {
	res.render("signup", {user: checkUser(), errorMessage: ''});
});

app.post('/signup', (req, res) => {
	var name = req.body.name;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
		user = checkUser();
		db.ref('users/' + user.uid).set({
			name: name,
			username: username,
			email: email
		});
		res.redirect('/profile');
	}, (error) => {
		res.render('signup', {user: checkUser(), errorMessage: error.message});
	});
});

app.get('/profile', (req, res) => {
	checkAuth(res);
	var uid = checkUser().uid;
	var returnArr;
	db.ref('users/' + uid).once('value').then(function(snapshot) {
	    for (i in snapshot.val()) {
	    	returnArr.push(i);
	    }
	    console.log(returnArr);
	});
	res.render("profile", {cred: returnArr, user: checkUser()});
});

app.get('/borrow', (req, res) => {
	// checkAuth(res);
	var rootRef = db.ref().child('Tools/' + 'Drills/');
	var returnArr = [];
	rootRef.once('value').then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	        var item = childSnapshot.val();
	        returnArr.push(item);
	    });
	    console.log(returnArr);
	    res.render('borrow', {user: checkUser(), tool: "a tool", results: returnArr});
	});
});

app.post('/borrow', (req, res) => {
	// checkAuth(res);
	var rootRef = db.ref().child('Tools/' + req.body.searchvalue);
	var returnArr = [];
	rootRef.once('value').then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	        var item = childSnapshot.val();
	        returnArr.push(item);
	    });
	    res.render('borrow', {user: checkUser(), tool: req.body.searchvalue, results: returnArr});
	});
});

app.get('/lend', (req, res) => {
	checkAuth(res);
	res.render("lend");
});

app.post('/lend', (req, res) => {
	var category = req.body.category;
	var upc = req.body.code;
	var size = req.body.size;
	var location = req.body.location;
	db.ref('Tools/' + category + '/033287163236/users').push({
		"Austin": "Atlanta"
	});
});

app.post('/lend', (req, res) => {
	var category = req.body.category;
	var size = req.body.size;
	var location = req.body.size;
});

function checkUser() {
	return firebase.auth().currentUser;
}

function checkAuth(res) {
	if (!checkUser()) {
		return res.redirect('/login');
	}
}

console.log("Hello world");
app.listen(port);