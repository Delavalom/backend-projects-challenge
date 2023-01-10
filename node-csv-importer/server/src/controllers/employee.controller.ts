import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const getEmployees = async (_req: Request, res: Response) => {
    try {
        const data = await prisma.employee.findMany()
        res.send(data)
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({
                message: error.message || "Error while retrieving employees from the database."
            })   
        }
        console.log(error)
    }
};

export default getEmployees