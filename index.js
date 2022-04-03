let express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//const filePath = path.join(__dirname, "/views/index-FINISHED.html");
let app = express();
app.use(express.static(path.join(__dirname, "public")));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let refreshcount = 0;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);
  refreshcount += 1;
  res.render("home", {
    kindOfDay: day,
    newListItems: items,
    refreshcount: refreshcount,
    //filePath: filePath,
  });
});

// let router = express.Router();

// router.get("/publication", function (req, res) {
//   res.sendFile(path.join(__dirname, "/views/index-FINISHED.html"));
// });

app.get("/finished", function (req, res) {
  res.redirect("index-FINISHED.html");
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function (req, res) {
  //console.log(filePath);
  console.log("Connected on port: 3000");
});
