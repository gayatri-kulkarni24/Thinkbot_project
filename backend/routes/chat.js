//backend/routes/chat.js
import express from "express";
import Thread from "../models/Thread.js";
import getGeminiResponse from "../utils/openAI.js";
 import authRequired from "../middleware/authRequired.js";
import { auth } from "./auth.js";
const router=express.Router();

//test
router.post("/test",async (req,res)=>{
    try {
        const thread=new Thread({
            threadID:"abc",
            title:"Testing new thread second time",
        });
        const response=await thread.save();
        res.send(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Failed to save in DB"});
        
    }
});

//Get all threads
router.get("/thread",authRequired,async (req,res)=>{
    try {
        //descending order of updatedAt...most recent data on top
        const threads=await Thread.find({ userId: req.user._id }).sort({updatedAt:-1});
        res.json(threads);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Failed to fetch threads"});

    }
});

//Get  thread on the basis of id
router.get("/thread/:threadID",authRequired,async (req,res)=>{
    const {threadID}=req.params;
    try {
        const thread=await Thread.findOne({threadID,userId: req.user._id});
        if(!thread){
            return res.status(404).json({error:"Thread not found"});
        }
        res.json(thread.messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Failed to fetch chat"});

    }
});

//Delete  thread on the basis of id
router.delete("/thread/:threadID",authRequired,async (req,res)=>{
    const {threadID}=req.params;
    try {
        const deletedThread=await Thread.findOneAndDelete({threadID,userId: req.user._id});
        if(!deletedThread){
            return res.status(404).json({error:"Thread not found"});
        }
         res.status(200).json({success:"Thread deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Failed to delete chat"});

    }
});

router.post("/chat",authRequired, async (req,res)=>{
    const {threadID,message}=req.body;
    if (!threadID || !message) {
        return res.status(400).json({error:"Missing required fields"});
    }
    try {
        let thread=await Thread.findOne({threadID,userId: req.user._id});
        if(!thread){
           thread=new Thread({
            threadID,
            title:message,
            messages:[{role:"user",content:message}],
             userId: req.user._id,
           });
        }else{
            thread.messages.push({role:"user",content:message});
        }
         const assistantReply=await getGeminiResponse(message);
          thread.messages.push({role:"assistant",content:assistantReply});
          thread.updatedAt=new Date();
          await thread.save();
          res.json({reply:assistantReply});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong"});

    }
});


export default router;