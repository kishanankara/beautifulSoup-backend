const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//create <mood>Track Schema & model
const AngryTrackSchema = new Schema({
	track_id: {
		type: String,
		required: [true, 'trackID field is required']
	},
	prev_url: {
		type: String,
		required: [true, 'prev_url field is required']

	},
	image_url: {
		type: String,
		required: [true, 'image_url field is required']

	},
	album_art: {
		type: String,
		required: [true, 'album_art field is required']
	}
	available: {
		type: Boolean,
		default: true
	}
});

const AngryTrack = mongoose.model('angryTrack', TrackSchema);

module.exports = AngryTrack;