import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from "./components/Login";
import Signup from "./components/Signup";
import { HomeClient } from './pages/HomeClient';
import HomeTherapist from "./pages/HomeTherapist";
import { auth } from "./services/firebase.config";

const App = () => {
  
  useEffect(() => {
    console.log("Firebase Auth Ready!", auth);
  }, []);

  return (
    <div>
      <nav>
        <Link to="/signup">Signup</Link> | <Link to ="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/client" element={<HomeClient />} />
        <Route path="/home-therapist" element={<HomeTherapist />} />
        {/* redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* fallback route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App
