import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase.config";

export default function TherapistProfile() {
  const { therapistId } = useParams();
  const [therapist, setTherapist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTherapist = async () => {
      const ref = doc(db, "therapists", therapistId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setTherapist(snap.data());
      }
    };
    fetchTherapist();
  }, [therapistId]);
  if (!therapist) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/client")}>🔙 Back</button>
      <h2>{therapist.name}</h2>
      <p>
        <strong>Specialty:</strong>
        {therapist.specialty}
      </p>
      {therapist.bio && (
        <p>
          <strong>Bio:</strong>
          {therapist.bio}
        </p>
      )}
      {therapist.photo && (
        <img
          src={therapist.photo}
          alt={therapist.name}
          style={{ width: "200px", borderRadius: "10px" }}
        />
      )}

      <button onClick={() => navigate(`/book/${therapistId}`)}>
        Book Appointment
      </button>
    </div>
  );
}
