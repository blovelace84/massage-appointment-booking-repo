// src/pages/Login.jsx
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 space-y-2 max-w-sm mx-auto border rounded">
      <h2 className="text-xl font-bold">Log In</h2>
      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">Log In</button>
    </form>
  );
}

export default Login;