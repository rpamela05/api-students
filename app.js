const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3050;
const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'semana16',
});

app.get('/',(req,res)=>{
    res.send('welcome to api');
});

app.get('/students',(req,res)=>{
    const sql = 'SELECT * FROM students';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/students/:id',(req,res)=>{
    const { id } = req.params;
  const sql = `SELECT * FROM students WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/add',(req,res)=>{
    const sql = 'INSERT INTO students SET ?';

  const customerObj = {
    fullname: req.body.fullname,
    age: req.body.age,
    student_code: req.body.student_code,
    date_birth:req.body.date_birth
  };
  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('Student created!');
  });
});
app.put('/update/:id',(req,res)=>{
    const { id } = req.params;
    const { fullname, age, student_code, date_birth} = req.body;
    const sql = `UPDATE students SET fullname = '${fullname}', age='${age}' , student_code='${student_code}' , date_birth='${date_birth}' WHERE id =${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Students updated!');
    });
  });
app.delete('/delete/:id',(req,res)=>{
    const { id } = req.params;
    const sql = `DELETE FROM students WHERE id= ${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Delete student');
    });
  });



connection.connect(error =>{
    if (error) throw error;
    console.log('Database server running');
});

app.listen(PORT, ()=>console.log('server running on port'))