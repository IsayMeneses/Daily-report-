const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());

const dataDir = path.join(__dirname, "data");

app.post("/save", (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  const filePath = path.join(dataDir, `${date}.json`);
  const jsonData = JSON.stringify(req.body);

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
