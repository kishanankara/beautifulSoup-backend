const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//create <mood>Track Schema & model
const HappyTrackSchema = new Schema({
	mood: {
		type: String,
		required: [true, 'mood required for fetch']
	},
	data: {
		type: Array,
		required: [true, 'data is required']
	}
});

const HappyTrack = mongoose.model('happy', HappyTrackSchema);

module.exports = HappyTrack;
