const express = require('express');
const app = express();
const port = 3000;
const database = require('./dbDATA');

app.use(express.json()); // this is to let json know that is expecting a json
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

// api implementation   
app.get('/info',(req,res)=>{

  const db = database.getdbFunctionsInstance();
  const result = db.gettingData();
  result
  .then(data => res.json({data: data}))
  .catch(err => console.log(err));

});

// to insert data 
app.post('/insert',(req,res)=>{
  const {name,last_name,location,length,width,price,telephone,about} = req.body;

  const db = database.getdbFunctionsInstance();

  const result = db.insertData(name,last_name,location,length,width,price,telephone,about);

  result
  .then (data =>res.json({success : data}))
  .catch(err => console.log(err));

})

// this is made to update the data inside the database
app.patch('/update',(req , res)=>{
  const {id,name,last_name,location,length,width,price,telephone,about} =req.body;

  const db = database.getdbFunctionsInstance();

  const result = db.updatePostbyId(id,name,last_name,location,length,width,price,telephone,about);

  result
  .then (data =>res.json({success : data}))
  .catch(err => console.log(err));

})

// This is to delete the posts
app.delete('/delete/:id', (req,res)=>{
  const {id} = req.params;
  const db = database.getdbFunctionsInstance();

  const result = db.deleteRow(id);

  result
  .then (data =>res.json({success : data}))
  .catch(err => console.log(err));

})

// to search 
app.get("/search" ,(req,res)=>{
  const location = req.query.location;
  const db = database.getdbFunctionsInstance();
  console.log(location, 'This is the location from the App.js');
  const result = db.search(location);

  result
  .then (data =>res.json({data : data}))
  .catch(err => console.log(err));
})

app.listen(port,()=> {
  console.log(`Example app listening at http://localhost:${port}`);
});






