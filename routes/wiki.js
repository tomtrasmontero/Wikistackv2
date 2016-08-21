//set up middleware function
var router = require('express').Router();
// automatically find index.js, need to specify if file is a different name
var models = require('../model')
var Page = models.Page;
var User = models.User;


module.exports = router;

// /wiki/
router.get('/', function(req,res,next){
	Page.findAll({})
	.then(function(result){
		res.render('index',{pages: result});
	})
})

//adds new row to our database through sequelize ORM
router.post('/', function(req,res,next){
	User.findOrCreate({
		where: {
			name: req.body.author,
			email: req.body.email
		}
	})
	.then(function(results){
		// console.log(results[0].id,"===============Here")
		var page = Page.build({
			title: req.body.title,
			content: req.body.content,
			authorId: results[0].id
		})

		page.save().then(function(results){
			res.redirect(results.route);
		})
		.catch(next);
	})	
})


router.get('/add', function(req,res,next){
	res.render('addpage');
})

// add query to find page, it returns a promise
router.get('/:urlTitle', function(req,res,next){
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		},
		// another way to use include
		include:[{ model: User, as: 'author'}]
	})
	.then(function(results){
		res.render('wikipage', {pageResult:results});
	})
	.catch(next);
	// res.send(req.params.urlTitle);
});
