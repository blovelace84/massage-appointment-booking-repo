import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase.config";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  Heading,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ErrorAlert from "./ErrorAlert";
import { getFriendlyErrorMessage } from "../utils/firebaseErrorMessages";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/client");
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
          Login
        </Heading>

        {error && <ErrorAlert message={error} />}

        <form onSubmit={handleLogin}>
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
            <Button colorScheme="teal" width="full" type="submit">
              Log In
            </Button>
          </VStack>
        </form>

        <Text mt="5" textAlign="center">
          Don’t have an account?{" "}
          <Button
            variant="link"
            colorScheme="teal"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Text>
      </Box>
    </Box>
  );
}
