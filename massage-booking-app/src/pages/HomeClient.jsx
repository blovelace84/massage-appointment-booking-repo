import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function HomeClient() {
  const [therapists, setTherapists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTherapists = async () => {
      const snapshot = await getDocs(collection(db, "therapists"));
      setTherapists(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchTherapists();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome Client</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Available Therapists</h3>
      {therapists.length > 0 ? (
        therapists.map((t) => (
          <div key={t.id} style={{ marginBottom: "10px" }}>
            <strong>{t.name}</strong> - {t.specialty}
            <button onClick={() => navigate(`/book/${t.id}`)}>
              View Profile
            </button>
          </div>
        ))
      ) : (
        <p>No therapists available.</p>
      )}
    </div>
  );
}
