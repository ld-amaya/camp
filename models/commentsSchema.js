var mongoose = require("mongoose");

var commentsSchema = mongoose.Schema({
	text: String,
	commentDate: Date,
	author: 
	{
		id: {
				type:mongoose.Schema.Types.ObjectId,
				ref:"user"
			},
		username: String
	}
});

module.exports = mongoose.model("comment", commentsSchema);