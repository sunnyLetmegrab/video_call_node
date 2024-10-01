import { log } from "console";
import UserModel from "../model/user_model.mjs";
import { loginValidate, addStaffValidate, addUserValidate, addExcerciseValidate, addMeetingValidate } from "../utils/user_validation"
import Crypto from 'crypto'
import ExcerciseModel from "../model/excercise_model.mjs";
import mongoose from "mongoose";
import MeetingModel from "../model/conf_model.mjs";

async function loginAdmin(req, res) {
  const { error, value } = await loginValidate.validate(req.body);
  if (error) {
    return res.status(400).send({ message: 'error in request', error: error })
  }
  var passwordhash = Crypto.createHash('md5').update(req.body.password).digest('hex').toString()
  var response = await UserModel.findOne({ email: req.body.email }, {}, {
    projection: {
      _v: false,
    }
  })


  if (response) {
    if (response.password === passwordhash) {
      response.password = null;
      return res.status(200).send({ message: "login working", data: response.toJSON() });
    } else {
      return res.status(200).send({ message: "password not matched" });
    }

  }
  return res.status(404).send({ message: "no user found" })

}
async function addStaff(req, res) {
  try {
    var { error, value } = addStaffValidate.validate(req.body)

    if (error) {
      return res.status(400).send({ message: 'error in request', error: error })
    }
    var passwordhash = Crypto.createHash('md5').update(req.body.password).digest('hex').toString()
    value.password = passwordhash
    value.roles = 'staff'
    var user = await UserModel.findOne({ email: value.email });

    if (user) {
      return res.status(400).send({ message: 'user already exists with this email.' })

    } else {
      var user = new UserModel(value)
      var createdUser = await user.save()
      return res.status(200).send({ message: "staff added", data: createdUser.toJSON() });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'server error', error: error })

  }
}

async function addUser(req, res) {
  try {
    var { error, value } = addUserValidate.validate(req.body)

    if (error) {
      return res.status(400).send({ message: 'error in request', error: error })
    }

    var user = await UserModel.findOne({ phoneNumber: value.phoneNumber });

    if (user) {
      return res.status(400).send({ message: 'user already exists with this Phone number.' })

    } else {
      var user = new UserModel(value)
      var createdUser = await user.save()
      return res.status(200).send({ message: "user added", data: createdUser.toJSON() });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'server error', error: error })

  }
}

async function creatMeeting(req, res) {
  try {
    var { error, value } = addMeetingValidate.validate(req.body)
    if (error) {
      return res.status(500).send({ message: 'server error', error: error })
    }
    value.meetingId = value.participents.join('_')
    value.participents = value.participents.map((e) => {
      var id = new mongoose.Types.ObjectId(e);
      return id;
    })

    var meeting = new MeetingModel(value)
    var response = await meeting.save();
    return res.status(200).send({ message: 'Meeting created', data: response })

  } catch (error) {
    return res.status(500).send({ message: 'server error', error: error })

  }
}

async function addExcercise(req, res) {
  try {
    var { error, value } = addExcerciseValidate.validate(req.body)
    if (error) {
      return res.status(400).send({ message: 'error in request', error: error })
    }
    var id = new mongoose.Types.ObjectId(value.addedById)
    console.log(id);

    var checkIfAdmin = await UserModel.countDocuments({ roles: { $in: ["admin", "staff"] }, id: id })
    if (checkIfAdmin > 0) {
      var excercise = new ExcerciseModel(value)
      var response = await excercise.save();
      return res.status(200).send({ message: 'Excercise Added', data: response.toJSON() })
    } else {
      return res.status(401).send({ message: 'Not authorized to add excercise' })
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'server error', error: error })

  }
}

async function joinMeeting(req, res) {

}

async function createWorkout(req, res) {

}

export {
  loginAdmin, addStaff, addUser, creatMeeting, addExcercise, joinMeeting, createWorkout
}