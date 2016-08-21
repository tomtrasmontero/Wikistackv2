var router = require('express').Router();
var models = require('../model')
var Page = models.Page;
var User = models.User;

module.exports = router;





router.get('/',function(req,res,next){
//list of authors with links to each page
	User.findAll({})
	.then(function(userResults){
		res.render('users', {users: userResults});
	})
	.catch(next);
})

router.get('/:userId',function(req,res,next){
//list of pages belonging to the authors with links to each page
	Page.findAll({
		// notice 'include' is in an array 
		include: [{
			// needs to mention the name of the model and the name of the association "as", ex. 'author'
			model: User,
			as: 'author',
			where: {
				id: req.params.userId
			}
		}]
	})
	.then(function(results){
		res.render('userPage', {pages: results});
	})
	.catch(next);
})


//Error route - takes four arguments!!
router.use(function (err, req,res,next){
	//customize the status being send back and message
	res.status(500).send(err.message);
});