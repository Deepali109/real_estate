//y9oy5mhymyYBRvZt
import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./Routes/userRoute.js";
import authRouter from "./Routes/authRoute.js";
import cookieParser from 'cookie-parser';
import listingRouter from './Routes/listingRoute.js';
import path from 'path';




const DB =process.env.DATABASE;
mongoose.connect(DB).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  }); 


const __dirname = path.resolve();

  const app= express();
  app.use(express.json());
  app.use(cookieParser());


app.listen(4000, () =>{
    console.log('Server is running on port 4000')
})


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use('/api/listing', listingRouter)


app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

//middleware 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });