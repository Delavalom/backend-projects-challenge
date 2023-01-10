import { Employee, Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { parse } from "fast-csv";
import { createReadStream } from "fs";
import { Parser as CsvParser } from "json2csv";
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
            data: employees,
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

const download = async (_req: Request, res: Response) => {
  const objs = await prisma.employee.findMany();
  let employees: Omit<
    Employee,
    "managerId" | "createAt" | "updateAt" | "avatar"
  >[] = [];
  objs.forEach((obj) => {
    const {
      id,
      name,
      email,
      username,
      dob,
      company,
      address,
      location,
      Salary,
      about,
      role,
    } = obj;

    employees.push({
      id,
      name,
      email,
      username,
      dob,
      company,
      address,
      location,
      Salary,
      about,
      role,
    });
  });

  const csvFields = [
    "id",
    "name",
    "email",
    "username",
    "dob",
    "company",
    "address",
    "location",
    "salary",
    "aobut",
    "role",
  ];

  const csvParser = new CsvParser({ fields: csvFields });
  const csvData = csvParser.parse(employees);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-disposition", "attachment; filename=employees.csv");
  res.status(200).end(csvData);
};

export default {
  upload,
  download,
}