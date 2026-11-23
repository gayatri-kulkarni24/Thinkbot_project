import { useState } from "react";
import { saveToken } from "./Auth.js";
import "./Auth.css";

export default function Login({ onLogin, onGoRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.message);
      return;
    }

    saveToken(data.token);
    onLogin();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={submit}>
          <div className="auth-field">
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
          </div>

          <div className="auth-field">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-btn" type="submit">
            LOGIN
          </button>
        </form>

        {msg && <p className="auth-msg">{msg}</p>}

        <div className="auth-link">
          New here?{" "}
          <span onClick={onGoRegister}>Create account</span>
        </div>
      </div>
    </div>
  );
}
