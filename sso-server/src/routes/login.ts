import type { NextFunction, Request, Response } from "express";

const alloweOrigin: Record<string, string> = {}

export const login = (req: Request, res: Response, next: NextFunction) => {
    const serviceUrl = req.query
}