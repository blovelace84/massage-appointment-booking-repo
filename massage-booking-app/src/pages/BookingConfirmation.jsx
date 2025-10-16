import { useNavigate } from "react-router-dom";

export default function BookingConfirmation() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>✅ Booking Confirmed!</h2>
      <p>Your appointment has been successfully booked.</p>
      <button onClick={() => navigate("/client")}>Back to Home</button>
    </div>
  );
}
