import express from "express";

export const router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

router.get("/", (_req, res) => {
  res.render("index", { title: "Mini Messageboard", messages });
});

router.get("/new", (_req, res) => {
  res.render("form", {});
});

router.post('/new', (req, res) => {
    const { messageText, messageUser } = req.body

    messages.push({
      text: messageText,
      user: messageUser,
      added: new Date(),
    })
    console.log('message added to the database')
    res.redirect('/')
})
