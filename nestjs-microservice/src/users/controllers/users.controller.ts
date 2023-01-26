import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cookies } from 'src/common/cookies.decorator';

@Controller('users')
export class UsersController {
    @Get()
    findAll(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const cookie_Stuff = req.signedCookies?.user
        if(!cookie_Stuff) {
            const auth_stuff = req.headers.authorization
            if(!auth_stuff) {
                res.setHeader("WWW-Authenticate", "Basic")
                res.status(401).json({
                    message: "user doesn't exist"
                })
            } else {
                
                const [username, password] = new Buffer(auth_stuff.split(" ")[1], "base64").toString().split(":")
                if(username === "admin" && password === "admin") {
                    res.cookie("user", "admin", { signed: true})
                    res.send("signed in the first time")
                } else {
                    res.setHeader("WWW-Authenticate", "Basic")
                    res.status(401).json({
                        message: "user doesn't exist"
                    })
                }
            }
        } else {
            if(req.signedCookies?.user === "admin") {
                res.send("hello genuine user")
            } else {
                res.setHeader("WWW-Authenticate", "Basic")
                res.status(401).json({
                    message: "user doesn't exist"
                })
            }
        }
    }
    @Get(':id')
    find(@Cookies('name') name: string) {
        return name
    }
}