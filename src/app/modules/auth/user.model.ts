import { Schema, model } from 'mongoose';
import { IUserModel, TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, IUserModel>({
  name: {
    type: String,
    required: [true, 'name is required'],
    max: [25, 'name must be less than 25 characters'],
    min: [2, 'name must be greater than 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  password: {
    type: String,
    min: [6, 'password must be greater than 6 characters'],
    required: [true, 'password is required'],
  },
});

userSchema.pre('save', async function (next) {
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.statics.isUserExists = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const UserModel = model<TUser, IUserModel>('User', userSchema);
export default UserModel;
