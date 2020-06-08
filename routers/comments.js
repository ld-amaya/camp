var express = require("express"),
	campDB = require("../models/dbSchema"),
	comments = require("../models/commentsSchema"),
	router = express.Router({mergeParams:true}),
	middleWare = require("../middleware");

// Add comments
router.get("/camps/:id/comment", middleWare.isLoggedIn, function(request,respond){
	campDB.findById(request.params.id,function(err, myCamp){
		if (!err){
			respond.render("./comments/comment",{camps:myCamp});
		} else {
			console.log(err);
		}
	});
})

// Save Comments
router.put("/camps/:id/comment", middleWare.isLoggedIn, function(request,respond){
	campDB.findById(request.params.id,function(err,commentData){
		if(!err){
			console.log(request.body.campComment);
			comments.create(request.body.campComment,function(err,comment){
				if(!err){
					//add username and id to comment
					comment.author.id = request.user.id;
					comment.author.username = request.user.username;
					comment.commentDate = Date();
					comment.save();
	
					//save comment
					commentData.comments.push(comment);
					commentData.save();
					respond.redirect("/camps/" + request.params.id);
				}else{
					console.log(err);
				}
			});
		} else {
			console.log(err);
		}
	})
})

// Display Comments 
router.get("/camps/:id/comment/:comment_id/edit", middleWare.isCommentOwner, function(request,respond){
	campDB.findById(request.params.id,function(err,camp){
		if (!err){
			comments.findById(request.params.comment_id,function(err,comments){
			if (!err){
				console.log(comments);
				respond.render("comments/edit",{
					camp:camp,
					comment:comments
				});
			} else {
				respond.redirect("back");
			}
		});
		}else{
			respond.redirect("back");
		}
	});
});

router.put("/camps/:id/comment/:comment_id", function(request,respond){
	comments.findByIdAndUpdate(request.params.comment_id, request.body.campComment,function(err,comments){
		if (!err){
			respond.redirect("/camps/" + request.params.id);
		} else {
			respond.redirect("back");
		}
	});
});

router.delete("/camps/:id/comment/:comment_id", middleWare.isCommentOwner, function(request,respond){
	comments.findByIdAndRemove(request.params.comment_id,function(err,camps){
		if (!err){
			respond.redirect("/camps/" + request.params.id);
		} else {
			respond.redirect("back")
		}
	});
});


module.exports =router;