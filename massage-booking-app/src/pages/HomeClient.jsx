// src/pages/HomeClient.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase.config";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function HomeClient() {
  const [therapists, setTherapists] = useState([]);
  const navigate = useNavigate();

  // Get current logged-in user
  const user = auth.currentUser;

  // Fetch therapists from Firestore
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const snapshot = await getDocs(collection(db, "therapists"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTherapists(data);
      } catch (err) {
        console.error("Error fetching therapists:", err);
      }
    };
    fetchTherapists();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user?.email || "Client"} 🎉</h1>
      <p>Here are available massage therapists:</p>

      {therapists.length > 0 ? (
        <ul>
          {therapists.map(t => (
            <li key={t.id}>
              <strong>{t.name}</strong> — {t.specialty}{" "}
              <button onClick={() => alert(`Booking with ${t.name}`)}>
                Book Appointment
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No therapists available yet.</p>
      )}

      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
