import config from '../../config';
import AppError from '../../error/AppError';
import { createToken } from './auth.utils';
import { TUser } from './user.interface';
import UserModel from './user.model';

const register = async (payload: TUser) => {
  const existUser = await UserModel.isUserExists(payload.email);
  if (existUser) {
    throw new AppError(400, 'User already Exist');
  }
  const createdUser = await UserModel.create(payload);

  return createdUser;
};

const login = async (payload: Partial<TUser>) => {
  const existUser = await UserModel.isUserExists(payload.email as string);
  if (!existUser) {
    throw new AppError(400, 'User does not exist');
  }

  const isPasswordMatched = await UserModel.isPasswordMatched(
    payload.password as string,
    existUser.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(400, 'Password does not matched');
  }
  const jwtPayload = {
    name: existUser.name,
    email: existUser.email,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken, refreshToken, user: jwtPayload };
};

export const userServices = {
  login,
  register,
};
