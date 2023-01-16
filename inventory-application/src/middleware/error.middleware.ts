import type { Request, Response, NextFunction } from "express";
import HttpException from "src/exceptions/HttpException.js";

export const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500
    const message = err.message || "Server error"
    res.status(status).json({ message })
}