const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
      host:'localhost',
      user: 'root',
      password: '12345',
      database: 'mydatabase'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySQL is Connected');
});

//Get Method

app.get('/getmovies',(req,res)=>{
    let sql = 'Select * from movies';
    let query = db.query(sql,(err,result)=>{
       if(err) throw err;
       res.send(result);
    });
});

//Get Single request
app.get('/getmovies/:id',(req,res)=>{
    let sql = `Select * from movies where id = ${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
       if(err) throw err;
       res.send(result);
    });
});

//Insert Method
app.post('/postmovies',(req,res)=>{
    let params={
         'title': 'Mr. Bean'
    }
    let sql = 'Insert into movies set ?';
    let query = db.query(sql,params,(err,result)=>{
       if(err) throw err;
       res.send('Sucessfully insert into movies');
    });
});


//Update Method
app.put('/updatemovies/:id',(req,res)=>{
     let newtitle= 'Rambo';
    let sql = `Update movies set title = '${newtitle}' where id = ${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
       if(err) throw err;
       res.send(`Sucessfully update the id number ${req.params.id}`);
    });
});


//Delete Method
app.delete('/deletemovies/:id',(req,res)=>{
   let sql = `Delete from movies where id = ${req.params.id}`;
   let query = db.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(`Sucessfully delete the id number ${req.params.id}`);
   });
});




app.listen('3000',()=>{
   
    console.log('Server listen on port 3000');

});