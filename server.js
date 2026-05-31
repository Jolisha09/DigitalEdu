const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const db = new sqlite3.Database("courses.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS registrations(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            mobile TEXT,
            course TEXT
        )
    `);
});

app.post("/register", (req, res) => {

    const { name, email, mobile, course } = req.body;

    db.run(
        `INSERT INTO registrations(name,email,mobile,course)
         VALUES(?,?,?,?)`,
        [name, email, mobile, course],
        (err) => {
            if (err) {
                return res.send("Error");
            }
            res.send("Registration Successful");
        }
    );
});

app.get("/students", (req, res) => {

    db.all("SELECT * FROM registrations", [], (err, rows) => {
        if (err) {
            return res.json([]);
        }

        res.json(rows);
    });
});

app.listen(3000, () => {
    console.log("Server Running");
});