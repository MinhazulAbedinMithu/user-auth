import { NextFunction, Request, Response } from 'express';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    message: 'Route Not Found !!!',
    errorMessage: 'Unexpected Route path',
  });
};

export default notFoundHandler;
