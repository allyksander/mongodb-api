import { Response } from "express";

export const handleError = (res: Response, error: Error | string) => {
  res.status(500).json(error);
};
