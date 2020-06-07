var express = require("express"),
	campDB = require("../models/dbSchema"),
	router = express.Router(),
	middleWare = require("../middleware"),
	flash = require("connect-flash");

//Use flash
router.use(flash());

//Index route that displays the home page
router.get("/",function(request,respond){
	respond.render("index");
});

//Index Route that displays camps page
router.get("/camps", function(request,respond){
	campDB.find({}, function(err,status){
		if (err){
			request.flash("error","Error in retrieving page.")
			respond.redirect("/")
		}else{
			respond.render("campsite/camps", {camps: status});
		}
	});
});

//Index Route that displays camps page
router.get("/camps/camps", function(request,respond){
	console.log("Get Request to camp page");
	campDB.find({}, function(err,status){
		if (err){
			request.flash("error","Error in retrieving page.")
			respond.redirect("/")
		}else{
			respond.render("campsite/camps", {camps: status});
		}
	});
	
});

//Create Route that displays camps page
router.post("/camps", middleWare.isLoggedIn, function(request,respond){
	var campName = request.body.campName,
		img = request.body.img,
		caption = request.body.caption,
		author = {
			id: request.user.id,
			username: request.user.username
		}
	var newCamp = {
		campName:campName,
		img:img,
		caption:caption,
		author: author,
	}
	// request.body.camp.body = request.sanitize(request.body.camp.body);
	campDB.create(newCamp, function(err,addcamp){
		if (!err){
				console.log(newCamp);
				respond.redirect("/camps");
			}else{
				request.flash("error","Error in retrieving page.")
				respond.redirect("/")
			}
	})
});

// Add New Camp
router.get("/camps/new", middleWare.isLoggedIn, function(request,respond){
	console.log("GET Request for new camp to be added")
	respond.render("campsite/new");
});

// View one camp
router.get("/camps/:id", function(request,respond){
	campDB.findById(request.params.id).populate("comments").exec(function(err,campSite){
		if (!err){
			respond.render("campsite/show",{camps:campSite});
		}else {
			request.flash("error","Error in retrieving page.")
			respond.redirect("back")
		}
	});	
});

// Edit camp
router.get("/camps/:id/edit",middleWare.isOwner, function(request,respond){
	campDB.findById(request.params.id,function(err,campSite){
		respond.render("campsite/edit",{camps: campSite});
	});
});

// Update camp
router.put("/camps/:id", middleWare.isOwner, function(request,respond){
	campDB.findByIdAndUpdate(request.params.id,request.body.camp,function(err,campSite){
		request.flash("success", "Successfully updated camp")
		respond.redirect("/camps/" + request.params.id);
	});	
});

//Delete camp
router.delete("/camps/:id", middleWare.isOwner, function(request,respond){
	campDB.findByIdAndRemove(request.params.id,function(err,campSite){
		request.flash("success", "Succesfully deleted camp")
		respond.redirect("/camps");
	});	
});
	
module.exports =router;
