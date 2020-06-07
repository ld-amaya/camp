var express = require("express"),
	passport=require("passport"),
	user = require("../models/userSchema"),
	router = express.Router();

//Login session
router.get("/login", function(request,respond){
	respond.render("login");
});

router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/camps",
		failureRedirect: "/login"
	}), function(request,respond){
});

//registration session
router.get("/register", function(request,respond){
	respond.render("register");
});

router.post("/register", function(request,respond){
	var newUser = new user({username:request.body.username});
	user.register(newUser,request.body.password,function(err,addUser){
		if(!err){
			passport.authenticate("local")(request,respond, function(){
				respond.redirect("/camps");
			})
		} else {
			request.flash("error", err.message);
			respond.redirect("/register");
		}
	})
})

//Logout user from session
router.get("/logout", function(request,respond){
	request.logout();
	respond.redirect("/");
});

module.exports = router;