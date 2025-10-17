import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase.config";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Heading } from "@chakra-ui/react";
import ErrorAlert from "./ErrorAlert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav("/client");
    } catch (err) {
      setError(err.message);
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
        Login
      </Heading>
      {error && <ErrorAlert message={error} />}

      <form onSubmit={handleLogin}>
        <Input
          type="text"
          typeof="email"
          placeholder="Email"
          mb="3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <Input
          type="text"
          placeholder="Password"
          mb="3"
          value={password}
          onChange={(e) => setPassWord(e.target.value)}
        />
        <br />
        <button colorScheme="teal" width="full" type="submit">
          Login
        </button>
      </form>
      <Button
        mt="3"
        variant="link"
        colorScheme="teal"
        onClick={() => nav("/signup")}
      >
        Don't have an account? Sign Up
      </Button>
    </Box>
  );
}
