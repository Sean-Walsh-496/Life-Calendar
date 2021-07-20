const express = require("express");
const datastore = require("nedb");

const app = express();
const port = 3000;
const db = new datastore("users.db");

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
    console.log("bruh");
});

app.post("/save", (req, res) => {
    console.log(req.body);
});


app.listen(port, () => console.log("working"));

