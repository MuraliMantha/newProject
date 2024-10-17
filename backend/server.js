const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./model/userModel');
const app = express();

const PORT = 8080 || 5000

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://dbUser000:murali123@cluster0.icdhk8y.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connected to 💾 DB")
})
.catch((err) => {
    console.error("Error connecting to DB", err);
})

app.post("/register", async(req, res) => {
    const {name, email, password} = req.body;
    console.log("Registering-----");
    try{
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message: "User already exists"})
        }

        const resUser = new User({name, email, password});
        await resUser.save(); 
        return res.status(200).json({message: "Success"})

    }catch(err){
        console.log("Error registering', ", err)
        return res.status(404).json({message: "Error registering"})
    }
})

app.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        return res.status(200).json({message: "login sucessfull"})

    }catch(err){
        console.log("Error logging in', ", err)
        return res.status(404).json({message: "Error logging in"})
    }
})

app.listen(PORT, ()=>{
    console.log(`connected to the server with ${PORT}`);
})