const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
    console.log("bruh");
});

app.post("/save", (req, res) => {
    console.log(req.body);
});


app.listen(port, () => console.log("working"));

