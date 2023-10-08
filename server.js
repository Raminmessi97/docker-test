const express = require("express");
const pool = require("./db");
const port = 3000;

const app = express();
app.use(express.json())

app.get("/home",async(req,res)=>{
    const {name,location} = req.body;
    try {
    const data = await pool.query('SELECT * FROM schools');
    res.status(200).json({message:data.rows})    
    } catch (error) {
        console.log('errr2',error)
    }
})

app.post("/",async(req,res)=>{
    const {name,location} = req.body;
    try {
    await pool.query('INSERT INTO schools (name,address) VALUES ($1,$2)',[name,location]);
    res.status(200).json({message:"INsert"})
    } catch (error) {
        console.log('errr3',error)
    }
})

app.get("/setup",async (req,res)=>{
    try {
        await pool.query("CREATE TABLE schools( id SERIAL PRIMARY KEY,name VARCHAR(100),address VARCHAR(100))")
        res.status(200).json({message:"Create table"})
    } catch (error) {
        console.log('errr',error)
    }
})

app.listen(port,()=>{
    console.log("Server run on port ",port);
})