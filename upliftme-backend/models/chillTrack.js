const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//create <mood>Track Schema & model
const ChillTrackSchema = new Schema({
	mood: {
		type: String,
		required: [true, 'mood required for fetch']
	},
	data: {
		type: Array,
		required: [true, 'data is required']
	}
});

const ChillTrack = mongoose.model('chill', ChillTrackSchema);

module.exports = ChillTrack;
