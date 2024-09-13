import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", (req, res, next) => {
  res.send("Hello " + req.body.username + " from Node Express");
});

app.get("/", (req, res, next) => {
  res.send("<form method='post'><input type='text' name='username'><button type='submit'>Name</button></form>");
});

app.listen(5000);
