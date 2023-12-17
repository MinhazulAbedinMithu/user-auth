import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const register = catchAsync(async (req, res, next) => {
  const registeredUser = await userServices.register(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User Registerd successfully',
    data: registeredUser,
  });
});

const login = catchAsync(async (req, res, next) => {
  const result = await userServices.login(req.body);

  const { refreshToken, accessToken, user } = result;
  res.cookie('accessToken', accessToken, { httpOnly: true });
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  // console.log({ loggedInUser });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User Logged in successfully',
    data: { token: accessToken, user },
  });
});

export const userControllers = {
  login,
  register,
};
