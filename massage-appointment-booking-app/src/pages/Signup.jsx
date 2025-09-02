// src/pages/Signup.jsx
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-4 space-y-2 max-w-sm mx-auto border rounded">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
      <button type="submit" className="w-full py-2 bg-green-500 text-white rounded">Sign Up</button>
    </form>
  );
}

export default Signup;