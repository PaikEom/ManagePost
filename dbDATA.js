const mysql = require('mysql');
let instance = null;

// connecting to the database 
const database1 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: "make_post"
});

// to show if the database is connected correcly 
database1.connect(function(error){
  if(error){
    throw error;
  }else {
    console.log('MySQL Database is connected');
  }
})

class dbFunctions{
  static getdbFunctionsInstance(){
    return instance ? instance : new dbFunctions();
  }
  // this is to display the backend data 
  async gettingData(){
    try{
      const response = await new Promise((resolve,reject)=>{
        const query = "SELECT id,name,last_name,location,length,width,price,telephone,about From posts;"; // I added id to the SELECT part **** ( works fine )

        database1.query(query,(err,results)=>{
          if(err) reject(new Error(err.message));
          resolve(results);
        })
      })
      return response;
    }
    catch(error){
      console.log(error);
    }
  }
  //to update the post 
  async updatePostbyId(id,name,last_name,location,length,width,price,telephone,about){
    try {
      id = parseInt(id,10); // converting the ID into an integer value
      const response = await new Promise((resolve,reject) =>{
        const query = "UPDATE posts SET name = ?, last_name = ?, location = ?, length = ?, width = ?, price = ?, telephone = ?, about = ? WHERE id = ?"; // this is a query to update the post 
        database1.query(query,[name,last_name,location,length,width,price,telephone,about,id],(err,result)=>{
          if (err)reject(new Error(err.message));
          resolve(result.affectedRows); 
        })
      });
      
      return response === 1 ? true : false;

    } catch (error){
      console.log(error);
      return false;
    }
    
  }
  // to delete the row 
  async deleteRow(id){
    try {
      id = parseInt(id,10);
      const response = await new Promise((resolve,reject)=>{
        const query = "DELETE FROM posts WHere id = ?";

        database1.query(query,[id],(err,result)=>{
          if (err)reject(new Error(err.message));
          resolve(result.affectedRows);
        })
      });

      return response === 1 ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
  }
  // inserting data
  async insertData(name,last_name,location,length,width,price,telephone,about){
    try{
      const insertId = await new Promise((resolve,reject)=>{
        const query = "INSERT INTO posts (name,last_name,location,length,width,price,telephone,about) VALUES (?,?,?,?,?,?,?,?);";
        database1.query(query,[name,last_name,location,length,width,price,telephone,about],(err,result)=>{
          if (err) reject(new Error(err.message));
          resolve(result);
        })

      });
      // return insertId === 1 ? true : false;
    }
    catch(error){
      console.log(error);
      return false;
    }
  }
  //to search 
  async search(location){
    console.log(location, 'This is the back end ');
    try {
      const locationSerach = await new Promise((resolve,reject)=>{
        const query = "SELECT * FROM posts WHERE location = ?";
        database1.query(query,[location],(err,results)=>{
          if (err) reject(new Error(err.message));
          else{
            resolve(results);
          }
        })
      })
      return locationSerach
      
    }
    catch(error){
      console.log(error);
      return false;
    }
  }
};
module.exports = dbFunctions;
