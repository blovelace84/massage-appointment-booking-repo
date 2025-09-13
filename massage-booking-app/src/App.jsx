import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomeClient from "./pages/HomeClient";
import HomeTherapist from "./pages/HomeTherapist";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home-client" element={<HomeClient />} />
        <Route path="/home-therapist" element={<HomeTherapist />} />
      </Routes>
    </Router>
  );
}

export default App
