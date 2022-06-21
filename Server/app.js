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


  ///////// medziai is MARIJA DB (READ)   // + JOIN left

app.get("/medukai", (req, res) => {
    const sql = `
    SELECT
    t.title AS title, g.title AS good, height, type, t.id
    FROM Medziai AS t
    LEFT JOIN goods AS g                     
    ON t.good_id = g.id
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

 ///////// Goodsis MARIJA DB (READ)

 app.get("/gerybes", (req, res) => {
  const sql = `
  SELECT
  *
  FROM goods
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

///////////////////////////////////

///////////  CREATE  MEDZIAI /////////////

app.post("/medukai", (req, res) => {
  const sql = `
  INSERT INTO Medziai
  (type, title, height, good_id)
  VALUES(?, ?, ?, ?)

`;
  con.query(sql, [req.body.type, req.body.title, req.body.height, req.body.good], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
    if (err) throw err;   
    res.send({result, msg: {text: 'New object created', type: 'success'}});
  });
});

///////////  CREATE GERYBES /////////////

app.post("/gerybes", (req, res) => {
  const sql = `
  INSERT INTO goods
  (title)
  VALUES(?)

`;
  con.query(sql, [req.body.title], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
    if (err) throw err;   
    res.send({result, msg: {text: 'New object created', type: 'success'}});
  });
});

///////////  DELETE  /////////////

app.delete("/medukai/:id", (req, res) => {
  const sql = `
  DELETE FROM Medziai
  WHERE id = ?

`;
  con.query(sql, [req.params.id], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
    if (err) throw err;   
    res.send(result);
  });
});


//////////  EDIT /////////////

app.put("/medukai/:id", (req, res) => {
  const sql = `
  UPDATE Medziai
  SET type = ?, title = ?, height = ?
  WHERE id = ?

`;
  con.query(sql, [req.body.type, req.body.title, req.body.height, req.params.id], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
    if (err) throw err;   
    res.send(result);
  });
});


/////// JOINN left ///////

