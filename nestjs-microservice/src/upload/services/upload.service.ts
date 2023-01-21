import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { createReadStream } from "fs";
import { finished } from "stream/promises";
import {Cache} from 'cache-manager'



@Injectable()
export class UploadFileService {
    constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}
    async uploadFile(file:Express.Multer.File) {
        // const reading = createReadStream(file.path).on("data", (chunk) => {

        // })
        // await finished(reading)
        // return "Stream is done reading"
        await this.cacheService.set("csv", file)

        const cachedFile = await this.cacheService.get("csv")

        if (cachedFile) {
            console.log("data from cache")
            return {
                file: cachedFile
            }
        }

        return {
            file: file.buffer.toString()
        }
    }
}