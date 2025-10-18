import express from "express";

const app = express();

app.get("/ping", (req, res) => {
  res.send({ message: "pong" });
});

app.listen(8000, () => {
  console.info("Listening at http://localhost:8000");
});
