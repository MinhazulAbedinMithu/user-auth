import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../error/AppError';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import UserModel from '../modules/auth/user.model';
import { Request } from 'express';

const authToken = catchAsync(async (req, res, next) => {
  // const token = req.cookies['accessToken'];
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    throw new AppError(400, 'You are not authorized!');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const user = await UserModel.isUserExists(decoded.email);

  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }
  (req as any).user = decoded as JwtPayload as Record<string, any>;
  next();
});

export default authToken;
