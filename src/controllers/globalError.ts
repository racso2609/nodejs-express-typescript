
import type { NextFunction, Request, Response } from "express";
const sendErrorDevelopment = (error,res:Response)=>{
  res.status(error.statusCode || 500).json({
    status: error.status || 'error',
    message: error.message,
    stack: error.stack,
    error

  })

}

const sendErrorProduction = (error,res:Response)=>{
  if(error.isOperational){
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    })
  }else{
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    })
  }
}

export const globalErrorController = (error,_req:Request,res: Response,_next:NextFunction)=>{
  if(process.env.NODE_ENV === 'development')
    sendErrorDevelopment(error,res)
  if(process.env.NODE_ENV === 'production')
    sendErrorProduction(error,res)
}
