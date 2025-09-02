// AppointmentForm.jsx
import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const AppointmentForm = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("Please log in to book.");

    try {
      await addDoc(collection(db, "appointments"), {
        userId: auth.currentUser.uid,
        date,
        time,
        type,
        createdAt: Timestamp.now(),
      });
      alert("Appointment booked!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2 border rounded">
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="">Select Massage Type</option>
        <option value="Swedish">Swedish</option>
        <option value="Deep Tissue">Deep Tissue</option>
        <option value="Hot Stone">Hot Stone</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Book</button>
    </form>
  );
}

export default AppointmentForm;