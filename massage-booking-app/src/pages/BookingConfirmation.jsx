import { useNavigate } from "react-router-dom";

export default function BookingConfirmation({ booking }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>✅ BookingConfirmed!</h2>
      <p>Your appointment request has been submitted successfully.</p>
      <button onClick={() => navigate("/client")}>Back to Dashboard</button>
    </div>
  );
}
