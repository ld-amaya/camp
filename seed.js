var mongoose = require("mongoose");
var campDB = require("./models/dbSchema");
var comments = require("./models/commentsSchema");

var data=[
	{name: "Camp Fire",
	img: "https://images.unsplash.com/photo-1539146395724-de109483bdd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	caption: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{name:"Camp Relax",
	img: "https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	caption:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ratione libero quos excepturi voluptatem sunt, quidem asperiores nobis obcaecati consectetur."
	},
	{name:"Camp Mist",
	img:"https://images.unsplash.com/photo-1535669647177-3df1a06cee9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	caption:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas consectetur aut architecto molestiae eligendi. Repellat magni at sed, assumenda dolor cumque amet atque cum velit tempore aliquid iusto, deserunt error quos ipsa. Similique ducimus, sint autem neque ad vel quidem voluptates temporibus esse! Neque distinctio soluta repudiandae, voluptate quos inventore!"
	}
];

function seedDB(){
	//Remove all data in the database
	campDB.deleteMany({},function(err){
		// if (err){
		// 	console.log(err);
		// } else {
		// 	console.log("DB Erased");
		// 	//Add data to daba
		// 	data.forEach(function(seed){
		// 		campDB.create(seed,function(err,data){
		// 			if (err){
		// 				console.log(err);
		// 			} else {
		// 				console.log("New camps added");
		// 				//Create sample comments
		// 				comments.create({
		// 					text: "Very relaxing place with no internet",
		// 					author: "Iliad and Odyssey"
		// 					}, function(err, addComment){
		// 						if (err){
		// 							console.log(err);
		// 						}else{
		// 						data.comments.push(addComment);
		// 						data.save();
		// 						console.log("Comment is added");
		// 					}
		// 				});
						
		// 			}
		// 		})
		// 	});
		// }
	});
}

module.exports = seedDB;