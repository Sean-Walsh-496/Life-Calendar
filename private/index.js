const express = require("express");
const datastore = require("nedb");

const app = express();
const port = 3000;
const db = new datastore("users.db");
let user;
const weekIndex = {row: null, col: null};
db.loadDatabase();

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("./login.html");
});

app.post("/save", (req, res) => {
    let {row, col} = weekIndex;

    db.update( {name: user}, { $set: {[`years.${row}.${col}`]: req.body}}, {}, function(){} );

    res.sendStatus(200);
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

        user = req.body.name;
        res.sendStatus(200);

    });

});

app.post("/week-index", (req, res) => {
    weekIndex.row = req.body.row;
    weekIndex.col = req.body.col;
    console.log(`Week index: [row: ${weekIndex.row} col: ${weekIndex.col}]`);
    res.sendStatus(200);
});

app.get("/view-week", (req, res) => {

    let {row, col} = weekIndex;
    //looks at user's profile
    db.findOne({name:user}, (err, doc) => {
        if (doc.years.hasOwnProperty(`${row}`)){
            if (doc.years[row].hasOwnProperty(`${col}`)){
                res.send(doc.years[row][col]);
            }
            else res.send({isBlank: true});
        }
        else res.send({isBlank: true});
    });
    
});


app.listen(port, () => console.log("working"));