import { Module } from "@nestjs/common";
import { UploadFileController } from "./controllers/upload.controller";
import { UploadFileService } from "./services/upload.service";
import { PrismaService } from "../prisma.service";

@Module({
    controllers: [UploadFileController],
    providers: [UploadFileService, PrismaService]
})
export class UploadFileModule {}