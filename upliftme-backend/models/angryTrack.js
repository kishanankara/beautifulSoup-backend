const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//create <mood>Track Schema & model
const AngryTrackSchema = new Schema({
	mood: {
		type: String,
		required: [true, 'mood required for fetch']
	},
	data: {
		type: Array,
		required: [true, 'data is required']
	}
});

const AngryTrack = mongoose.model('angry', AngryTrackSchema);

module.exports = AngryTrack;
