//y9oy5mhymyYBRvZt
import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./Routes/userRoute.js";
import authRouter from "./Routes/authRoute.js";
import cookieParser from 'cookie-parser';
import listingRouter from './Routes/listingRoute.js';

const app= express();
app.use(express.json());

app.use(cookieParser());

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


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use('/api/listing', listingRouter)

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