import {NextFunction,Request,Response} from "express";

export const asyncHandler = (asyncFn: Function) => (req:Request, res: Response, next: NextFunction) => {
  asyncFn(req, res, next).catch(next);
};
