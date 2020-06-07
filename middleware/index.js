var mwareObj ={},
	campDB = require("../models/dbSchema"),
	comments = require("../models/commentsSchema");

// Create function isLoggedIn to check is logged in notnot -Middleware
mwareObj.isLoggedIn = function(request,respond,next){
	if (request.isAuthenticated()){
		next();
	} else {
		request.flash('info', 'You need to login first');
		respond.redirect("/login");
	}
}

//Check if user is owner of the post
mwareObj.isOwner = function(request,respond,next){
	if (request.isAuthenticated()){
		campDB.findById(request.params.id,function(err,campSite){
			if (!err){
				if(campSite.author.id.equals(request.user._id)){
					next();
				} else {
					respond.redirect("back");
				}
			} else {
				respond.redirect("back");
			}
			
		});
	} else {
		respond.redirect("/login");
	}
}

//Check if user is owner of the comment
mwareObj.isCommentOwner = function(request,respond,next){
	if (request.isAuthenticated()){
		comments.findById(request.params.comment_id,function(err,comment){
			if (!err){
				if (comment.author.id.equals(request.user.id)){
					next();
				} else {
					respond.redirect("back");
				}
			} else {
				respond.redirct("back");
			}
		});
	} else {
		respond.redirect("/login");
	}
}

module.exports = mwareObj;