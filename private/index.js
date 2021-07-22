const express = require("express");
const datastore = require("nedb");

const app = express();
const port = 3000;
const db = new datastore("users.db");
let user;
db.loadDatabase();

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("./login.html");
});

app.post("/save", (req, res) => {
    console.log(req.body);
});

app.post("/login", (req, res) => {
    db.find({name: req.body.name}, (err, docs) =>{
        if (docs.length == 0){
            db.insert(req.body);
        }
        else if (docs[0].password != req.body.password){
            res.sendStatus(401)
            return;
        }

        user = req.body;
        res.sendStatus(200);

    });

});


app.listen(port, () => console.log("working"));