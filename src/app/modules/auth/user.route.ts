import { Router } from 'express';
import { userValidations } from './user.validation';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import sendResponse from '../../utils/sendResponse';
import authenticateToken from '../../middlewares/authToken';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidations.registerValidationSchema),
  userControllers.register,
);
router.post(
  '/login',
  validateRequest(userValidations.loginValidationSchema),
  userControllers.login,
);
router.get('/me', authenticateToken, (req, res, next) => {
  const user = (req as any).user;

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User Logged in successfully',
    data: user,
  });
});
router.get('/logout', authenticateToken, (req, res, next) => {
  res.clearCookie('accessToken');
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User Logged in successfully',
    data: null,
  });
});

export const userRoutes = router;
