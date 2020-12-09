import {Response} from "express";

export function errorHandler(res: Response, error: {message: string} | string) {
  res.status(500).json({
    success: false,
    // @ts-ignore
    message: error.message ? error.message : error
  });
}
