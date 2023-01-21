import {
  CacheInterceptor,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express'
import { UploadFileService } from "../services/upload.service";

@Controller("upload")
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}
  
  @Post("/")
  @UseInterceptors(FileInterceptor("file_asset"))
  // @UseInterceptors(CacheInterceptor) only for Get Request
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadFileService.uploadFile(file)
  }
}
