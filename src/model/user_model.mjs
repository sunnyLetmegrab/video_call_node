import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: mongoose.Types.ObjectId,
  name: String, 
  email: String,
  password: String,
  phoneNumber: String,
  roles: {
    type: String,
    enum: ['user', 'admin', 'staff'],
    default: 'user'
  },

}, {
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
 
 delete userObject.password;

 
 return userObject;
 };

// Compile model from schema
var UserModel = mongoose.model('users', UserSchema);


export default UserModel