const express = require("express");
const mysql = require("mysql");
const cors=require('cors')

const app = express();
app.use(cors({
    origin:['*']
    //origin:'http://localhost:3000'
}));//allows  port
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "chengsoft",
  database: "node_apidb1",
  port:'3306'
});

connection.connect((err)=>{
    if(err){
        console.log('Error connecting to MySQL database = ',err)
        return
    }
    console.log('MySQL successfully connect.')
})

//Create Routes
app.post("/user",async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        connection.query("INSERT INTO users(fullname,email,password)VALUES(?,?,?)",
        [name,email,password],
        (err,results,fields)=>{
            if(err){
                console.log(err)
                return res.status(400).send();
            }
            return res.status(201).json({message:"Created user successfully."})
        })
    }catch(err){
        console.log(err)
        return res.status(500).send();
    }
})

//Read
app.get("/user",async(req,res)=>{
    try{
        connection.query("SELECT * FROM users",(err,results,fields)=>{
            if(err){
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results);
        })
    }catch(err){
        console.log(err)
        return res.status(500).send()
    }
})

//search
app.get("/user/search/:email",async(req,res)=>{
    const email=req.params.email;

    try{
        connection.query("SELECT * FROM users WHERE email=?",
        [email],(err,results,fields)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            res.status(200).json(results)
        })
    }catch(err){
        console.log(err)
        return res.status(500).send();
    }
})

//Update
app.patch("/user/:email",async(req,res)=>{
    const email=req.params.email;
    const newPassword=req.body.password;

    try {
        connection.query("UPDATE users SET password=? WHERE email=?",[newPassword,email],(err,results,fields)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            console.log(results)
            res.status(200).json({message:"Update user successfully."})
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send();
    }
})

//Delete
app.delete("/user/:id",async(req,res)=>{
    const userId=req.params.id;
    try {
        connection.query("DELETE FROM users WHERE id=?",[userId],(err,results,fields)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            if(results.affectedRows===0){
                return res.status(404).json({message:"Not found user id"})
            }
            res.status(200).json({message:"Delete user succesfully"})
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})

app.listen(5000, () => console.log("Server is running on port 5000"));
