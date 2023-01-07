//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const getDB = () => {
  return JSON.parse(
    fs.readFileSync("public/users.json", { encoding: "utf-8" })
  );
};

const saveDB = (newDB) => {
  fs.writeFileSync("public/users.json", JSON.stringify(newDB), {
    encoding: "utf-8",
  });
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", (req, res) => {
  const body = req.body;
  console.log(body);

  res.json({
    status: "success!",
  });
});

// API
app.post("/api/users", (req, res) => {
  const body = req.body;
  let msg = "wrong request type";
  console.log(body);

  if (body.type == "checkID") {
    const DB = getDB();
    if (DB[body.reqID]) {
      msg = "unavil";
    } else {
      msg = "avil";
    }
  }

  if (body.type == "addUser") {
    // double-check if user's info is valid
    msg = "invalid user info";
    const userInfo = body.reqUserInfo;
    console.log(1);
    if (userInfo.ID.length < 3 || userInfo.PW.length < 3) return;
    console.log(2);

    const DB = getDB();
    if (DB[userInfo.ID]) return;
    console.log(3);

    // add the user
    DB[userInfo.ID] = userInfo;
    console.log(DB);
    saveDB(DB);

    msg = "successfully added user to DB!";
  }

  res.json({ body: msg });
});

app.listen(3000, () => {
  console.log("Server started on port 3000\n-> http://localhost:3000 <-");
});
