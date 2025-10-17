import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase.config";
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
      setError(error.message);
    }
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt="100px"
      p="6"
      borderWidth="1px"
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
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="therapist">Therapist</option>
          </Select>
          <Button colorScheme="teal" width="full" type="submit">
            Sign Up
          </Button>
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
