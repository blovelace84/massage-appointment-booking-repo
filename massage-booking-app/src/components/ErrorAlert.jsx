import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function ErrorAlert({ title = "Error", message }) {
  return (
    <Alert status="error" borderRadius="md" mb={4}>
      <AlertIcon />
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
}
