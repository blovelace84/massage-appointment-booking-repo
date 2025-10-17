import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase.config";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Heading, VStack, Text } from "@chakra-ui/react";
import ErrorAlert from "./ErrorAlert";

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
        Login
      </Heading>

      {error && <ErrorAlert message={error} />}

      <form onSubmit={handleLogin}>
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
          <Button colorScheme="teal" width="full" type="submit">
            Log In
          </Button>
        </VStack>
      </form>

      <Text mt="3" textAlign="center">
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
  );
}
