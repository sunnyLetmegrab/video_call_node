import express from 'express';
import bodyParser from 'body-parser';
import adminRoute from './routes/admin_routes.mjs';
import userRoute from './routes/user_routes.mjs';
import path from 'path'
import { fileURLToPath } from 'url'
var app = express()


app.use(bodyParser.json())
const __filename = fileURLToPath(import.meta.url); // get the resolved path to 
const __dirname = path.dirname(__filename);
app.use("/public", express.static(path.join(__dirname, 'public/')));


app.use('/app/admin', adminRoute)
app.use('/app/user', userRoute)


export default app