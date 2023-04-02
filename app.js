const express = require('express');
const app = express();
// const cors = require('cors');
const port = 3000;
const database = require('./dbDATA');
// app.use(cors());
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
// to send data to the back end, I need to fix this one since is not working as it should 
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
app.listen(port,()=> {
  console.log(`Example app listening at http://localhost:${port}`)
});




// {
//   "name":"Jose",
//   "last_name":"Criqui",
//   "location":"New York",
//   "length":"1",
//   "width":"1",
//   "price":"100",
//   "telephone":"123456789",
//   "about":"This is my parking spot"


// }

