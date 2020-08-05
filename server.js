var express = require("express");
var app = express();
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/posts", function (req, res) {
  const fileName = "public/data.json";
  const rawdata = fs.readFileSync(fileName);
  const results = JSON.parse(rawdata);
  res.send(results);
});

app.post("/update", function (req, res) {
  const fileName = "public/data.json";
  const JSONData = JSON.stringify(req.body, null, 2);
  fs.writeFileSync(fileName, JSONData, (error) => {
    console.log("[Numbers Data] Error - Writing file failed");
    console.log(error);
    return false;
  });
  res.end();
});

app.listen(8000, function () {
  console.log("App running on port 8000");
});
