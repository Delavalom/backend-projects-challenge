import { Module } from "@nestjs/common";
import { ProductsController } from "./controllers/products.controller";
import { ProductsService } from "./services/products.service";
import { PrismaService } from "../prisma.service";

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, PrismaService],
})
export class ProductsModule {}