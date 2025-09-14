import { Routes, Route, Link } from 'react-router-dom';
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
        {/* fallback route */}
        <Route path="*" element={<h1>Page not found</h1>} />
        
      </Routes>
    </div>
  );
}

export default App
