import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { Prisma, Product } from "@prisma/client";
import { ProductsService } from "../services/products.service";
@Controller("products")
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get("/")
  getProducts(@Query("limit") limit = 100, @Query("offset") offset = 0) {
    return this.productService.products(offset, limit)
  }

  @Get("/:id")
  getProduct(@Param("id", ParseIntPipe) id: Product["id"]) {
    return this.productService.product(id)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("/")
  createProduct(@Body() payload: Prisma.ProductCreateInput) {
    return this.productService.create(payload)
  }

  @Put("/:id")
  updateProduct(
    @Param("id", ParseIntPipe) id: Product["id"],
    @Body() payload: Prisma.ProductUpdateInput
  ) {
    return this.productService.update(id, payload)
  }

  @Delete("/:id")
  deleteProduct(@Param("id", ParseIntPipe) id: Product["id"]) {
    return this.productService.delete(id)
  }
}
