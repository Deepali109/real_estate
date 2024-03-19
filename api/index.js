import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const app= express();

const DB =process.env.DATABASE;
mongoose.connect(DB).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  }); 


  
app.listen(4000, () =>{
    console.log('Server is running on port 4000')
})
