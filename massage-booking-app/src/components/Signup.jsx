import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  Heading,
  Select,
  VStack,
  Text,
} from "@chakra-ui/react";
import ErrorAlert from "./ErrorAlert";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), { email, role });

      if (role === "therapist") {
        navigate("/therapist");
      } else {
        navigate("/client");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt="100px"
      p="6"
      borderBlockWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading mb="4" textAlign="center">
        Sign Up
      </Heading>
      {error && <ErrorAlert message={error} />}

      <form onSubmit={handleSignup}>
        <VStack spacing={3}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="therapist">Therapist</option>
          </select>
          <br />
          <button colorScheme="teal" width="full" type="submit">
            Sign Up
          </button>
        </VStack>
      </form>

      <Text mt="3" textAlign="center">
        Already have an account?{" "}
        <Button
          variant="link"
          colorScheme="teal"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Text>
    </Box>
  );
}
