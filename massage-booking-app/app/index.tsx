import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { account } from "./services/appwrite";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"client" | "therapist" | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Try to fetch current session
        const user = await account.get();
        setIsLoggedIn(true);

        // TEMP: for now, just check if name contains "therapist"
        if (user.name.toLowerCase().includes("therapist")) {
          setUserRole("therapist");
        } else {
          setUserRole("client");
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return null; // could render a splash screen here
  }

  if (!isLoggedIn) {
    // Not logged in → go to Login
    return <Redirect href="/screens/LoginScreen" />;
  }

  // // Logged in → redirect by role
  // if (userRole === "therapist") {
  //   return <Redirect href="/(therapist)/dashboard" />;
  // }

  // return <Redirect href="/(client)/home" />;
}
