import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase.config";
import { useNavigate } from "react-router-dom";

const HomeClient = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            await signOut(auth);
            console.log("User has logged out");
            navigate("/login");
        }catch(error){
            console.error("Error logging out:", error.message);
        }
    };

    const therapists = [
        { id: 1, name: "Alice Johnson", specialty: "Swedish Massage" },
        { id: 2, name: "Bob Smith", specialty: "Deep Tissue Massage" },
        { id: 3, name: "Cathy Lee", specialty: "Aromatherapy" },
    ];

    return(
        <div style={{ padding: "20px"}}>
            <h2>Welcome Client</h2>
            <p>Here are your available therapists:</p>
            <ul>
                {therapists.map((therapist) => (
                    <li key={therapist.id}>
                        <strong>{therapist.name}</strong> - {therapist.specialty}{" "}
                        <button onClick={() => alert(`Booking with ${therapist.name}`)}>
                            Book Now
                        </button>
                    </li>
                ))}
            </ul>
            <br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default HomeClient;