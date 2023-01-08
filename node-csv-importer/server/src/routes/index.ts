import express from "express";

export const router = express.Router();

router.get("/", (_req, res) => {
  res.render("index", { title: "Mini Messageboard" });
});

router.get("/new", (_req, res) => {
  res.render("form", {});
});

router.post('/new', (req, res) => {
    const { messageText, messageUser } = req.body

    console.log('message added to the database')
    res.redirect('/')
})
