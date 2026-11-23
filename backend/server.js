import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';
 import dotenv from "dotenv";
 dotenv.config();
 import fetch from "node-fetch";
import { Parts } from 'openai/resources/uploads.mjs';
import mongoose from 'mongoose';
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

const app=express();
const PORT=8080;
app.use(express.json());
app.use(cors());
 
app.use("/auth", authRoutes);
app.use("/api",chatRoutes);

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
    connectDB();
});

const connectDB=async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected with database");
    
  } catch (error) {
    console.log("Failed to connect with DB",error);
    
  }
}

// app.post("/test",async(req,res)=>{
//     const API_KEY=process.env.OpenAI_API_KEY;
//     const options={
//          method: "POST",
//          headers: {
//       "Content-Type": "application/json",
//       "X-goog-api-key": API_KEY,
//     },
//     body: JSON.stringify({
//       contents: [
//         {
//         parts: [{ text: req.body.message }],
//         },
//       ],
//     }),
//     }
//     try {
//         //const response=await fetch("https://generativelanguage.googleapis.com",options);
//         const response=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",options);
//          const data = await response.json();
//          console.log(data.candidates[0].content.parts[0].text);
//          res.send(data.candidates[0].content.parts[0].text);
//     } catch (error) {
//         console.log(error);
        
//     }
// });


//const API_KEY=process.env.OpenAI_API_KEY;
//const url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

//async function runGemini(){
//     const response = await fetch(url, {
//    method: "POST",
//    headers: {
//      "Content-Type": "application/json",
//      "X-goog-api-key": API_KEY,
//    },
//    body: JSON.stringify({
//      contents: [
//        {
//          parts: [{ text: "Explain about the nodejs" }],
//        },
//      ],
//    }),
//  });
//
// const data = await response.json();
//
//  
//  console.log(data.candidates[0].content.parts[0].text.trim());
//}
//runGemini();
