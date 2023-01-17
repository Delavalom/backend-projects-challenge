import { z } from "zod";

export type CreateProduct = z.infer<typeof createProduct>;

export const createProduct = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(0).max(255),
    stock: z.number(),
    url: z.string().url(),
    categoryId: z.number(),
});

export const updateProduct = createProduct.partial()

export type UpdateProduct = z.infer<typeof updateProduct>;