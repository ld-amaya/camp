var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

// Add the plugin
UserSchema.plugin(passportLocalMongoose);

//Return user schema
module.exports = mongoose.model("user", UserSchema);
