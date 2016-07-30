var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

/* The User Schema ========================================*/

var UserSchema = new Schema({

	email: {type: String, unnique: true, lowercase: true},
	password: String,

	profile: {
		name: {type: String, default: ''},
		picture: {type: String, default: ''}
	},

	address: String,

	history: [{
		date: Date,
		paid: {type: Number, default: 0},
		//item: {type: Schema.Type.ObjectId, ref: ''}
	}]

});



/* Hash the password before saving tto the databse */

// "pre" is a built in mongoose method that run before the writting into the database.
UserSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt){
		if(err) return next(err);
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) return next(err);
			user.password = hash;
			next();
		})
	});
});


/* Compare the password in the database with the one user has provided. */

// declare custom method to comapare the passwords
UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
}



module.exports = mongoose.model('User', UserSchema);





