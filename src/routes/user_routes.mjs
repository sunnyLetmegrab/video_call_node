import express from 'express';
import { addWorkout, getMeetingInfo, loginStaff, updateExcerCiseStatus } from '../controller/user_controller.mjs';

const userRoute = express.Router()

userRoute.post('/login_staff', loginStaff)


userRoute.post('/add_workout', addWorkout)

userRoute.post('/update_excercise_status', updateExcerCiseStatus)
userRoute.get('/meeting/:id', getMeetingInfo)

export default userRoute