import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase.config";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import HomeClient from "./pages/HomeClient";
import HomeTherapist from "./pages/HomeTherapist";
import BookingForm from "./pages/BookingForm";
import BookingConfirmation from "./pages/BookingConfirmation";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {user ? (
        <>
          <Route path="/client" element={<HomeClient />} />
          <Route path="/therapist" element={<HomeTherapist />} />
          <Route path="/book/:therapistId" element={<BookingForm />} />
          <Route path="/booking-confirmed" element={<BookingConfirmation />} />
          <Route path="*" element={<Navigate to="/client" />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
