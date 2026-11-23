import "./SideBar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import {v1 as uuidv1} from "uuid";
import { getToken } from "./Auth.js";

function SideBar() {
    const {allThreads,setAllThreads,currThreadId,setNewChat,setPrompt,setReply,setCurrThreadId,setPrevChats}=useContext(MyContext);

    const getAllThreads=async()=>{
        try {
            const token =getToken(); // or wherever you saved it
           const response= await fetch("http://localhost:8080/api/thread",{
            headers: {
                 "Authorization": `Bearer ${token}`,
                 "Content-Type": "application/json",
            }
           });
           const res=await response.json();
           
           const filterdData=res.map(thread=>({threadId:thread.threadID,title:thread.title}));
          // console.log(filterdData);
           setAllThreads(filterdData);
           return res;
        } catch (error) {
            console.log(error);
            
        }
    };

    useEffect(()=>{
        getAllThreads();
    },[currThreadId]);

    const createNewChat=()=>{
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread=async(newThreadID)=>{
        setCurrThreadId(newThreadID);
        try {
            const response= await fetch(`http://localhost:8080/api/thread/${newThreadID}`,{
                 headers: {
                    "Authorization": `Bearer ${getToken()}`,
                    "Content-Type": "application/json"
                }
            });
            const res=await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch (error) {
            console.log(error);
               
        }
    };

    const deleteThread=async(threadID)=>{
        try {
            const response=await fetch(`http://localhost:8080/api/thread/${threadID}`,{
                method:"DELETE",
                headers: {
                    "Authorization": `Bearer ${getToken()}`,
                    "Content-Type": "application/json"
                }
            });
            const res=await response.json();
            console.log(res);
            setAllThreads(prev=>prev.filter(thread=>thread.threadId !== threadID));
            if(threadID===currThreadId){
                createNewChat();
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    return ( 
        <section className="sidebar">
            <button onClick={createNewChat}>
                <img src="src/assets/robo.png" alt="thinkbot logo" className="logo"></img>
                <span><i className="fa-solid fa-file-pen"></i></span>
            </button>
            <ul className="history">
                {
                allThreads?.map((thread,idx) =>(
                    <li key={idx} onClick={()=>changeThread(thread.threadId)}
                    className={thread.threadId===currThreadId ? "highlighted":" "}>
                    {thread.title}
                    <i className="fa-solid fa-trash-can"
                    onClick={(e)=>{
                        e.stopPropagation(); 
                        deleteThread(thread.threadId);
                    }}></i>
                    </li>
                ))
            }
            </ul>
            <div className="sign">
                <p>By Gayatri &hearts;</p>
            </div>
        </section>
     );
}

export default SideBar;