import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { Prisma, Product } from "@prisma/client";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async products(skip: number, take: number) {
    return this.prisma.product.findMany({
      skip,
      take,
    });
  }

  async product(id: Product["id"]) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  async update(id: Product["id"], data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: Product["id"]) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
