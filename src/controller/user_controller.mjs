import mongoose from 'mongoose';
import UserModel from '../../src/model/user_model.mjs';
import MeetingModel from '../model/conf_model.mjs';

async function loginStaff(req, res) {

}

async function addWorkout(req, res) {

}

async function updateExcerCiseStatus(req, res) {

}


async function getMeetingInfo(req, res) {
  try {
    var id = req.params.id;
    var meetingId = new mongoose.Types.ObjectId(id)
    var meetingCount = await MeetingModel.countDocuments({ _id: id })
    if (meetingCount > 0) {
      var response = await MeetingModel.aggregate([{

        $lookup: {
          from: 'users',
          localField: 'participents',
          foreignField: '_id',
          as: 'participents'
        }
      },
      {
        $match: {
          "_id": meetingId
        },
      },
      {
        $unwind: { path: "$excercise", preserveNullAndEmptyArrays: true },
      },
      // Lookup to join with the exercise collection
      {

        $lookup: {
          from: "excercises", // Ensure this is the correct collection name
          localField: "excercise.excerciseId",
          foreignField: "_id",
          as: "exerciseDetails"
        }
      },
      ])

      if (response.length > 0) {
        return res.status(200).send({ message: 'message', data: response[0] })
      }

    }
    return res.status(404).send({ message: 'no meeting found' })

  } catch (error) {
    console.log(error);

    return res.status(500).send({ message: 'error', error: error })

  }
}

export {
  loginStaff,
  addWorkout,
  updateExcerCiseStatus,
  getMeetingInfo
}