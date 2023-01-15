import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";

const prisma = new PrismaClient();

const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  stock: z.number(),
  url: z.string(),
  categoryId: z.number(),
});

export const route = Router();

route.post("/", async (req, res) => {
  const data: z.infer<typeof ProductSchema> = req.body;
  await prisma.product.create({
    data,
  });
  res.status(201).json({ message: "product created" });
});
