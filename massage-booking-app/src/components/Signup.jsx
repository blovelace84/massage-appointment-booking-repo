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
  useColorModeValue,
} from "@chakra-ui/react";
import ErrorAlert from "./ErrorAlert";
import { getFriendlyErrorMessage } from "../utils/firebaseErrorMessages";

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
      const friendlyMessage = getFriendlyErrorMessage(error.code);
      setError(friendlyMessage);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box
        w={{ base: "90%", sm: "400px" }}
        p="8"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Heading mb="6" textAlign="center">
          Sign Up
        </Heading>

        {error && <ErrorAlert message={error} />}

        <form onSubmit={handleSignup}>
          <VStack spacing={4}>
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

        <Text mt="5" textAlign="center">
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
    </Box>
  );
}
