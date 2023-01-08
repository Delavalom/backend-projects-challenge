import express from "express";

const router = express.Router();

router.post("/csv/upload", (req, res) => {
  const { body } = req;
  res.send('');
});

router.get("/csv/download", (_req, res) => {
  res.send('');
});

router.get("/employees", (_req, res) => {
  res.json();
});
