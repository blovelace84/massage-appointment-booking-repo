import { auth, db } from "../services/firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeTherapist() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(
        collection(db, "bookings"),
        where("therapistId", "==", auth.currentUser.uid)
      );
      const snapshot = await getDocs(q);
      setBookings(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchBookings();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome Therapist</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Your Bookings</h3>
      {bookings.length > 0 ? (
        bookings.map((b) => (
          <div key={b.id}>
            Client: {b.clientEmail} <br />
            Date: {b.date}
          </div>
        ))
      ) : (
        <p>No bookings yet.</p>
      )}
    </div>
  );
}
