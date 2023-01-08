import { Employee, Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { parse } from "fast-csv";
import { createReadStream } from "fs";
import invariant from "tiny-invariant";

const prisma = new PrismaClient();

const upload = async (req: Request, res: Response) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }
    let employees: Employee[] = [];

    let path = "../../resources/static/assets/uploads" + req.file.filename;

    createReadStream(path)
      .pipe(parse({ headers: true }))
      .on("error", (err) => {
        throw err.message;
      })
      .on("data", (row) => employees.push(row))
      .on("end", async () => {
        try {
          await prisma.employee.createMany({
            data: employees
          });
          res.status(201).send({
            message: `The file: ${req.file?.originalname} was successfully uploaded!`,
          });
        } catch (error) {
          if (error instanceof Error) {
            res.status(500).send({
              message: "couldn't import data into database!",
              error: error.message,
            });
          }
        }
      });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({
        message: "Failed to upload the file",
      });
    }
  }
};
