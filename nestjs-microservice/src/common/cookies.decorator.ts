import { createParamDecorator, ExecutionContext, Logger } from "@nestjs/common";
import { Request } from "express";

export const Cookies = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const logger = new Logger(Cookies.name) 
        const request = ctx.switchToHttp().getRequest<Request>()
        if (request.hostname !== "localhost") {
            logger.error(`request host is different than ${request.hostname}`)
        }
        return data ? request.cookies?.[data] : request.cookies
    }
)