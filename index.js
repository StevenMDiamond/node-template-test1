let express = require("express");
const bodyParser = require("body-parser");
let app = express();

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
  });
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
  console.log("Connected on port: 3000");
});
