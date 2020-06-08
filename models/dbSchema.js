var mongoose = require("mongoose");
var dbSchema = new mongoose.Schema({
	campName: String,
	img: String,
	caption: String,
	author: 
	{
		id: {
				type:mongoose.Schema.Types.ObjectId,
				ref:"user"
			},
		username: String
	},
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "comment"
		}
	],
	campDate: Date
});

//3. Create the model
module.exports = mongoose.model("camp", dbSchema);