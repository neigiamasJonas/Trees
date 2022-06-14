const express = require('express');
const app = express();
const port = 3003;

/// Isikopinta
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");

/// Isikopinta.. kad veiktu.. nesigilinam
app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());
  
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Pasha",
  });


//Routes
app.get('/', (req, res) => {
  res.send('Tu man sakai: Bye Bye Bye Bye!')
})

app.get('/zuikis', (req, res) => {
    res.send('Zuikis, puikis')
  })


  ///////// medziai is MARIJA DB

app.get("/medukai", (req, res) => {
    const sql = `
    SELECT
    *
    FROM Medziai
  `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

///////////////////////////////////

app.listen(port, () => {
  console.log(`Alo - alo, Baločka Jonas klauso - ${port}`)
})