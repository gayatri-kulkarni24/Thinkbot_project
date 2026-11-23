import './App.css'
import SideBar from "./SideBar";
import ChatWindow from './ChatWindow';
import { MyContext } from './MyContext';
import { useState, useEffect } from 'react';
import { v1 as uuidv1 } from "uuid";
import { getToken, logout } from "./Auth.js";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Settings from "./Settings.jsx";
import Upgrade from "./Upgrade.jsx";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  const [page, setPage] = useState("login");
  
  // const [page, setPage] = useState(getToken() ? "chat" : "login");

  // Auto login if token exists
  useEffect(() => {
    if (getToken()) setPage("chat");
  }, []);

  if (page === "login") {
    return (
      <>
        <Login onLogin={() => setPage("chat")} 
          onGoRegister={() => setPage("register")}
          />
      </>
    );
  }

  if (page === "register") {
    return (
      <>
        <Register onGoLogin={() => setPage("login")} />
      </>
    );
  }

  if (page === "Settings") {
  return <Settings goBack={() => setPage("chat")} />;
}

if (page === "Upgrade") {
  return <Upgrade goBack={() => setPage("chat")} />;
}
  
  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    page, setPage
  };

  return (
    <MyContext.Provider value={providerValues}>
      <div className="app">
        <SideBar />
        <ChatWindow setPage={setPage}/>
      </div>
    </MyContext.Provider>
  );
}

export default App;
