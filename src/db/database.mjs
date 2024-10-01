import mongoose from 'mongoose';


async function connectDB() {
  try {
    const mongoDb = await mongoose.connect("mongodb+srv://sunnyletmegrab:Admin123123@cluster0.jafgv9r.mongodb.net/video-conf");
    console.log('Connected to mongo DB');

  } catch (error) {
    console.log(error);

    console.log('Connected to mongo DB failed');
  }

}


export {
  connectDB
}
