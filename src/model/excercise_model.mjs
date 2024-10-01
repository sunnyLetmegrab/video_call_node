import mongoose from "mongoose";


var Schema = mongoose.Schema;

var ExcerciseSchema = new Schema({
  id: mongoose.Types.ObjectId,
  title: String,
  description:String,
  addedById: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  }
}, { timestamps: true });
// Compile model from schema
var ExcerciseModel = mongoose.model('excercise', ExcerciseSchema);

export default ExcerciseModel