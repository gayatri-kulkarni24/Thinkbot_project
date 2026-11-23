import "./ChatWindow.css"
import  Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext,useState,useEffect} from "react";
import {HashLoader} from "react-spinners";
import { logout,getToken } from "./Auth.js";


function ChatWindow({setPage }) {
    const {prompt,setPrompt,reply,setReply,currThreadId,prevChats,setPrevChats,setNewChat}=useContext(MyContext);
    const [loading,setLoading]=useState(false);
    const [isOpen,setIsOpen]=useState(false);



    const getReply=async()=>{
        setLoading(true);
        setNewChat(false);
        console.log("message",prompt,"theread id",currThreadId);
        
        const options={
            method: "POST",
            headers: {
                "Authorization": "Bearer " + getToken(),
                "Content-Type": "application/json",
  
            },
            body:JSON.stringify({
                message:prompt,
                threadID:currThreadId,
            })
        };
        try {
           const response= await fetch("http://localhost:8080/api/chat",options);
           const res=await response.json();
           setReply(res.reply);
           console.log(res);
           
        } catch (error) {
            
        }
        setLoading(false);
    }

    //append new chats to prevChats
    useEffect(()=>{
        if(prompt && reply){
            setPrevChats(prevChats=>(
                [...prevChats,{
                    role:"user",
                    content:prompt
                },{
                    role:"assistant",
                    content:reply
                }]
            ));
        }
        setPrompt("");
    },[reply]); 

    
    const handleProfileClick=()=>{
        setIsOpen(!isOpen);
    }
     
    
    const handleSetting=()=>{
        setPage("Settings");
         setIsOpen(!isOpen);
    }
    const handlePlan=()=>{
        setPage("Upgrade");
        setIsOpen(!isOpen);
    }
    const handleLogout = () => {
        logout();
        setPage("login");
    };

    const customStyle = {
    color: 'rgb(230, 134, 9)',
    fontFamily: 'fantasy', // Use camelCase for inline styles
    fontSize: '25px'
  }
    return ( 
       <div className="chatwindow">
        <div className="navbar">
            <span style={customStyle}>ThinkBot <i className="fa-solid fa-angles-down"></i></span>
            
            <span className="navi"><div className="mode"><i className="fa-solid fa-sun">
                </i></div>
                 
            <div className="userIconDiv" onClick={handleProfileClick}>
              <span className="userIcon">  <i className="fa-solid fa-user-tie"></i></span>
            </div>
            </span>
        </div>
        {
            isOpen &&
            <div className="dropdown">
                <div className="dropDownItem" onClick={handleSetting}><i class="fa-solid fa-gear"></i>Setting</div>
                <div className="dropDownItem" onClick={handlePlan}><i class="fa-solid fa-arrow-up-right-from-square"></i>Upgrade Plan</div>
                <div className="dropDownItem" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i>Log Out</div>
            </div>
        }

        <Chat></Chat>
        <HashLoader color="#fff" loading={loading}></HashLoader>

        
             
        <div className="chatinput">
            <div className="inputBox">
                <input placeholder="Ask whatever you wish..." value={prompt} onChange={(e)=>setPrompt(e.target.value)} onKeyDown={(e) =>e.key ==='Enter'?getReply():''}>
                </input>
                <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane" style={{color:"#830a0aff"}}></i></div>
            </div>
            <p className="info">
                ThinkBOT responses can occasionally be inaccurate. Check important info. See Cookie Preferences.
            </p>
        </div>
       </div>
     );
}

export default ChatWindow;