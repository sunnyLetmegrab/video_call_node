import mongoose from "mongoose";


var Schema = mongoose.Schema;

var ConfSchema = new Schema({
  id: mongoose.Types.ObjectId,
  meetingId: String,
  participents: {
    type: [mongoose.Types.ObjectId],
  },
  joinTime: {
    type: [{
      userId: mongoose.Types.ObjectId,
      time: Date,
    }]
  },
  excercise: {
    type: [
      {
        excerciseId: {
          type: mongoose.Types.ObjectId,
          ref: 'excercise'
        },
        completed: {
          type: Boolean,
          default: false,
        }
      }
    ], default: [],
  },
  recorded: {
    type: Boolean,
    default: false,
  },
  recordedUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });
// Compile model from schema
var MeetingModel = mongoose.model('meetings', ConfSchema);

export default MeetingModel
