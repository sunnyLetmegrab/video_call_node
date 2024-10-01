import {connectDB} from './src/db/database.mjs';

import app from './src/app.mjs';


import http from 'http'


const server= http.createServer(app)

server.listen(9011,()=>{
  connectDB();

})