import type { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException.js";
import { ZodError } from "zod";

export const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpException) {
        const status = err.status || 500
        const message = err.message || "Server error"
        res.status(status).json({ message })
    }
    if (err instanceof ZodError)
    res.status(400).json({ message: err.message })
}