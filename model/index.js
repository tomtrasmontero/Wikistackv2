var Sequelize = require('sequelize');
//connect to postgres
var db = new Sequelize('postgres://localhost:5432/wikistack2');

var Page = db.define('page', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	status: {
		type: Sequelize.ENUM('open', 'closed')
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
}, {
	getterMethods : {
		route: function(){
			return '/wiki/' + this.urlTitle;
		}
	},
	hooks: {
		// arguments inside the function will refer to the instance
		beforeValidate: function(page){
			page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
		}
	}	

});

var User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		isEmail: true
	}

});



Page.belongsTo(User, { as: 'author'});


module.exports = {
	Page: Page,
	User: User

}