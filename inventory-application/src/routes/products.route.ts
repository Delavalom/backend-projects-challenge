import { PrismaClient, Product } from "@prisma/client";
import { Router } from "express";
import HttpException from "../exceptions/HttpException.js";
import { z } from "zod";

const prisma = new PrismaClient();

const productSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(0).max(255),
  stock: z.number(),
  url: z.string().url(),
  categoryId: z.number(),
});
type ProductSchema = z.infer<typeof productSchema>;

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
    const data: ProductSchema = req.body;
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
    const data: ProductSchema = req.body;
    if (!id || !data) {
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
