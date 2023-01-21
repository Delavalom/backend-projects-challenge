import { Injectable } from "@nestjs/common";
import { createReadStream } from "fs";
import { finished } from "stream/promises";



@Injectable()
export class UploadFileService {
    async uploadFile(file:Express.Multer.File) {
        const reading = createReadStream(file.path).on("data", (chunk) => {

        })
        await finished(reading)
        return "Stream is done reading"
    }
}