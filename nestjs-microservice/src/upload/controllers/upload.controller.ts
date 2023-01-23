import {
  CacheInterceptor,
  Controller,
  Get,
  Header,
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
  
  // @UseInterceptors(CacheInterceptor) only for Get Request
  @Post("accept")
  create() {
    return this.uploadFileService.createRecord()
  }

  @Post()
  @UseInterceptors(FileInterceptor("file_asset"))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadFileService.uploadFile(file)
  }
}
