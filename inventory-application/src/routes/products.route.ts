import { PrismaClient, Product } from "@prisma/client";
import { Router } from "express";
import HttpException from "../exceptions/HttpException.js";
import { type CreateProduct, type UpdateProduct, createProduct, updateProduct } from "../dtos/producto.dto.js";
import { z } from "zod";

const prisma = new PrismaClient();



export const route = Router();

route.get("/", async (_req, res, next) => {
    try {
        const data = await prisma.product.findMany();
        if (!data) {
          throw new HttpException(404, 'not found')
        }
        return res.status(200).json({ message: "succesful fetch", data });
    } catch (error) {
      if (error instanceof HttpException) {
        next(error);
      }
    }
});

route.get("/:id", async (req, res, next) => {
  try {
    const { id }: { id: string } = req.params;
    z.coerce.number().parse(id)
    const data = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!data) {
      throw new HttpException(404, "not found mate");
    }
    return res.status(200).json({ message: "succesful fetch", data });
  } catch (error) {
    next(error)
  }
});

route.post("/", async (req, res, next) => {
  try {
    const data: CreateProduct = req.body;
    const validation = createProduct.parse(data)
    if (!data) {
      throw new HttpException(404, "not found mate");
    }
    await prisma.product.create({
      data,
    });
    return res.status(201).json({ message: "product created" });
  } catch (error) {
    next(error)
  }
});

route.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data: UpdateProduct = req.body;
    createProduct.parse(data)
    if (!data) {
      throw new HttpException(404, "not found mate");
    }
    await prisma.product.update({
      where: {
        id: Number(id),
      },
      data,
    });
    return res.status(200).json({ message: "product updated" });
  } catch (error) {
    next(error)
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new HttpException(404, "not found mate")
    }
    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ message: "product deleted" });
  } catch (error) {
    next(error)
  }
});
