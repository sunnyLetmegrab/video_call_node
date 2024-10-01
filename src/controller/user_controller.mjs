import UserModel from '../../src/model/user_model.mjs';
import MeetingModel from '../model/conf_model.mjs';

async function loginStaff(req, res) {

}

async function addWorkout(req, res) {

}

async function updateExcerCiseStatus(req, res) {

}


async function getMeetingInfo(req, res) {
  var id = req.params.id;

  var meetingCount = await MeetingModel.countDocuments({ _id: id })

  var response = await MeetingModel.aggregate([{
    $lookup: {
      from: 'users',
      localField: 'participents',
      foreignField: '_id',
      as: 'participents'
    }
  }])

  if (response.length > 0) {
    return res.status(200).send({ message: 'message', data: response[0] })
  }


}

export {
  loginStaff,
  addWorkout,
  updateExcerCiseStatus,
  getMeetingInfo
}