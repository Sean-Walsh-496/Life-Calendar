const express = require("express");
const datastore = require("nedb");

const app = express();
const port = 3000;
const db = new datastore("users.db");

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("./login.html");
});

app.post("/save", (req, res) => {
    console.log(req.body);
});

app.post("/login", (req, res) => {
    console.log(req.body);

});


app.listen(port, () => console.log("working"));