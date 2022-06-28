const express = require('express');
const app = express();
const port = 3004;

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
    t.title AS title, g.title AS good, height, type, t.id, GROUP_CONCAT(co.com, '-^o^-') AS coms, GROUP_CONCAT(co.id) AS coms_id, t.rates, t.rate_sum
    FROM Medziai AS t
    LEFT JOIN goods AS g                     
    ON t.good_id = g.id
    LEFT JOIN comments AS co
    ON co.tree_id = t.id
    GROUP BY t.id
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

 ///////// Goodsis MARIJA DB (READ) ++++ RIGHT JOIN

 app.get("/gerybes", (req, res) => {
  const sql = `
  SELECT
  g.title, g.id, COUNT(t.id) AS trees_count
  FROM Medziai AS t
  RIGHT JOIN goods AS g                     
  ON t.good_id = g.id
  GROUP BY g.id
  ORDER BY COUNT(t.id) DESC
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
  con.query(sql, [req.body.type, req.body.title, req.body.height ? req.body.height : 0, req.body.good !== '0'? req.body.good : null], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
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

///////////  DELETE GOODS /////////////

app.delete("/gerybes/:id", (req, res) => {
  const sql = `
  DELETE FROM goods
  WHERE id = ?

`;
  con.query(sql, [req.params.id], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
    if (err) throw err;   
    res.send(result);
  });
});


//////////  EDIT + EDIT GOODS /////////////

app.put("/medukai/:id", (req, res) => {
  const sql = `
  UPDATE Medziai
  SET type = ?, title = ?, height = ?, good_id = ?
  WHERE id = ?

`;
  con.query(sql, [req.body.type, req.body.title, req.body.height, req.body.good, req.params.id], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
    if (err) throw err;   
    res.send(result);
  });
});


///////////////////////////////////////

 ///////// Goodsai MARIJA DB (READ) ++++ RIGHT JOIN

 app.get("/front", (req, res) => {
  const sql = `
  SELECT
  g.title, g.id, t.title AS trees_title, GROUP_CONCAT(t.title) AS tree_titles
  FROM Medziai AS t
  RIGHT JOIN goods AS g                     
  ON t.good_id = g.id
  GROUP BY g.id
  ORDER BY g.title
  
  
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

///////////////////////////////////
  ///////// medziai is MARIJA DB (READ)   // + JOIN left

  app.get("/front/trees", (req, res) => {
    const sql = `
    SELECT
    t.title AS title, g.title AS good, height, type, t.id, GROUP_CONCAT(co.com, '-^o^-') AS coms, t.rates, t.rate_sum
    FROM Medziai AS t
    LEFT JOIN goods AS g                     
    ON t.good_id = g.id
    LEFT JOIN comments AS co
    ON co.tree_id = t.id
    GROUP BY t.id
  `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });


  /////////////////////////////////// Comments   ///////////
  app.post("/front/comments", (req, res) => {
    const sql = `
    INSERT INTO comments
    (com, tree_id)
    VALUES(?, ?)
  
  `;
    con.query(sql, [req.body.com, req.body.treeId], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
      if (err) throw err;   
      res.send({result, msg: {text: 'New object created', type: 'success'}});
    });
  });


/// com del

  app.delete("/front/comments/:comId", (req, res) => {
    const sql = `
    DELETE FROM comments
    WHERE id = ?
    `;

    con.query(sql, [req.params.comId], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'Komentaro pabaiga', type: 'info' } });
    });
});

/// rate create 'http://localhost:3004/front/balsuok/'

app.put("/front/balsuok/:treeId", (req, res) => {
  const sql = `
  UPDATE Medziai
  SET rates = rates + 1, rate_sum = rate_sum + ?
  WHERE id = ?

`;
  con.query(sql, [req.body.rate, req.params.treeId], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
    if (err) throw err;   
    res.send({result, msg: {text: 'Prabalsuota sekmingai', type: 'success'}});
  });
});