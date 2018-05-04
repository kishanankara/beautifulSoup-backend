const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//create <mood>Track Schema & model
const SadTrackSchema = new Schema({
	mood: {
		type: String,
		required: [true, 'mood required for fetch']
	},
	data: {
		type: Array,
		required: [true, 'data is required']
	}
});

const SadTrack = mongoose.model('sad', SadTrackSchema);

module.exports = SadTrack;
