import express from 'express';
import bodyParser from 'body-parser';
import adminRoute from './routes/admin_routes.mjs';
import userRoute from './routes/user_routes.mjs';

var app = express()


app.use(bodyParser.json())



app.use('/app/admin', adminRoute)
app.use('/app/user', userRoute)


export default app