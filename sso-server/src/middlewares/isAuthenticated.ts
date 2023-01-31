import type { NextFunction, Request, Response } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const redirectUrl = `${req.protocol}://${req.headers.host}${req.path}`
    if(req.headers.cookie == null) {
        return res.redirect("")
    }
    next()
}