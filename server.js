var express = require("express");
var app = express();
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");
var port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
app.use(express.static(__dirname + "/build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public", "index.html"));
// });

app.get("/posts", function (req, res) {
  const fileName = "src/data.json";
  const rawdata = fs.readFileSync(fileName);
  const results = JSON.parse(rawdata);
  res.send(results);
});

app.post("/update", function (req, res) {
  const fileName = "src/data.json";
  const JSONData = JSON.stringify(req.body, null, 2);
  fs.writeFileSync(fileName, JSONData, (error) => {
    console.log("[Numbers Data] Error - Writing file failed");
    console.log(error);
    return false;
  });
  res.end();
});

app.listen(port, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
