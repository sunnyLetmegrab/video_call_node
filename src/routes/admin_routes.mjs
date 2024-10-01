import express from 'express';
import { addExcercise, addStaff, addUser, createWorkout, creatMeeting, joinMeeting, loginAdmin } from '../controller/admin_controller.mjs';

const adminRoute = express.Router()

adminRoute.post('/login_admin', loginAdmin)

adminRoute.post('/add_staff', addStaff)
adminRoute.post('/add_user', addUser)

adminRoute.post('/create_meeting', creatMeeting)

adminRoute.post('/add_excercise', addExcercise)

adminRoute.post('/join_meeting', joinMeeting)

adminRoute.post('/create_workout', creatMeeting)



export default adminRoute