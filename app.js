var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	db = require("mongoose"),
	seedDB = require("./seed"),
	methodOverRide = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	passport=require("passport"),
	passportLocal = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	flash = require("connect-flash"),
	campDB = require("./models/dbSchema"),
	comments = require("./models/commentsSchema"),
	user = require("./models/userSchema");

var authRoutes = require("./routers/auth"),
	campRoutes = require("./routers/camps"),
	commentRoutes = require("./routers/comments");

// seedDB();
// Connect to database
var URL = process.env.DATABASEURL || "mongodb://localhost/Yelp"
db.set('useUnifiedTopology', true);
db.connect(URL, {useNewUrlParser: true});


//Add body-Parser this allows the node js to convert the request.body into a javascript file
// A middle ware between express and http
app.use(bodyParser.urlencoded({extended: true}));
//5. Include the static library
app.use(express.static("public"));
//6. Set EJS Engine to remove .ejs extensions in the code
app.set("view engine", "ejs");
// Allow to use put
app.use(methodOverRide("_method"));
app.use(flash());
app.use(expressSanitizer());

//************* PASSPORT CONFIGURATION ******************
//set secret code
app.use(require("express-session")({
	secret: "Lou is the greatest software developer",
	resave: false,
	saveUninitialized:false	
}));

//Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

//Initialize passport authentication
passport.use(new passportLocal(user.authenticate()));

//Initialize passport serialization and deserialization
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//****************RESTful ROUTES*****************

//Declare global variable currentUser 
app.use(function(request,respond,next){
	respond.locals.currentUser=request.user;
	respond.locals.info = request.flash("info");
	respond.locals.error = request.flash("error");
	respond.locals.success = request.flash("success");
	next();
});

app.use(commentRoutes);
app.use(campRoutes);
app.use(authRoutes);

//Add the listening funciton
app.listen(3000, function(){
// app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server is listening");
});