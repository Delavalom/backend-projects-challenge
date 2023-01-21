import { Module } from "@nestjs/common";
import { UploadFileController } from "./controllers/upload.controller";
import { UploadFileService } from "./services/upload.service";

@Module({
    controllers: [UploadFileController],
    providers: [UploadFileService]
})
export class UploadFileModule {}