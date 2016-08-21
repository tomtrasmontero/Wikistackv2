var express = require('express');
var app = express();
var swig = require('swig');
var bodyParser = require('body-parser');
// var morgan = require('morgan')
var path = require('path');
// connect to where the server and express app are being defined
var models = require('./model')
var Page = models.Page;
var User = models.User;


var routesWiki = require('./routes/wiki.js');
var routesUser = require('./routes/user.js');

// parse content sent to browser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// point res.render to the proper directory
app.set('views', __dirname + '/views');

//have res.render work with html file
app.set('view engine', 'html');

//when res.render work with html files have it use swig to do so
app.engine('html',swig.renderFile);

//turn off swig's cacheing;
swig.setDefaults({cache:false});

// app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));





app.use('/wiki/', routesWiki);
app.use('/users/', routesUser);


app.get('/', function(req,res,next){
	res.redirect('/wiki/');
})





models.User.sync({})
.then(function(){
	// force true on Page
	return models.Page.sync({ })//force: true
})
.then(function (){
	app.listen(3001, function (){
		console.log('Server is listening on port 3001!');
	});
})
.catch(console.error);