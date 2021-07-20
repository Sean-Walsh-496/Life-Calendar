const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) =>{
    console.log("I hope this works")
});


app.listen(port, () => console.log("working"));