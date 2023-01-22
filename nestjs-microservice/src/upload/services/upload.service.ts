import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { ConfigService } from "@nestjs/config";
import * as csv from 'csvtojson'
import { ZodError } from 'zod'
import { UploadSchema, uploadSchema } from "../entities/upload.entity";


@Injectable()
export class UploadFileService {
  constructor(
    private readonly configService: ConfigService,
    // @ts-ignore
    @Inject(CACHE_MANAGER) private cacheService: Cache
  ) {}
  async uploadFile(file: Express.Multer.File) {
    try {
        const csvData = file.buffer.toString()
        const data: UploadSchema = await csv().fromString(csvData)

        uploadSchema.parse(data)

        const cachedFile = await this.cacheService.get<string>("csv");
        
        if (cachedFile) {
            console.log("data from cache");
            return {
                file: cachedFile,
            };
        }

        await this.cacheService.set("csv", JSON.stringify(data));
        
        return {
          file: data
        };
    } catch (error) {
        if (error instanceof ZodError) {
            return error.message
        }
        console.log(error)
    }
  }
}

