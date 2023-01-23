import { CACHE_MANAGER, Inject, Injectable, Logger } from "@nestjs/common";
import { Cache } from "cache-manager";
import { ConfigService } from "@nestjs/config";
import * as csv from "csvtojson";
import { ZodError } from "zod";
import { UploadSchema, uploadSchema } from "../entities/upload.entity";
import { PrismaService } from "src/prisma.service";
import { PrismaClientValidationError } from "@prisma/client/runtime";

@Injectable()
export class UploadFileService {
  private readonly logger = new Logger(UploadFileService.name);

  constructor(
    private readonly configService: ConfigService,
    // @ts-ignore
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private prisma: PrismaService
  ) {}
  async uploadFile(file: Express.Multer.File) {
    try {
      const cachedFile = await this.cacheService.get<string>("csv");

      if (cachedFile) {
        console.log("data from cache");
        return {
          file: JSON.parse(cachedFile),
        };
      }

      const csvData = file.buffer.toString();
      const data: UploadSchema = await csv().fromString(csvData);

      uploadSchema.parse(data);

      await this.cacheService.set("csv", JSON.stringify(data));

      return {
        file: data,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return error.message;
      }
      console.log(error);
    }
  }

  async createRecord() {
    try {
      const cachedFile = await this.cacheService.get<string>("csv");

      if (!cachedFile) {
        throw new Error("Cache data doesn't exist");
      }

      const data: UploadSchema = JSON.parse(cachedFile);

      uploadSchema.parse(data);

      await this.prisma.salary.createMany({ data });

      return {
        message: "Records created successfully",
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return error.message;
      } else if (error instanceof PrismaClientValidationError) {
        return { error: error.message }
      }
      return error;
    }
  }
}
