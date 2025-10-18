import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../services/firebase.config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  Text,
  useColorModeValue,
  Spinner,
  Card,
  CardBody,
} from "@chakra-ui/react";

export default function HomeClient() {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch therapists from Firestore
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const therapistList = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((user) => user.role === "therapist");
        setTherapists(therapistList);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleBookAppointment = (therapistId) => {
    navigate(`/book/${therapistId}`);
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      {/* Header Section */}
      <Box
        bg={useColorModeValue("teal.500", "teal.600")}
        color="white"
        py={4}
        px={8}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="md"
      >
        <Heading size="md">Massage Booking App</Heading>
        <Button colorScheme="whiteAlpha" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={6}
      >
        {loading ? (
          <Spinner size="xl" color="teal.500" />
        ) : (
          <VStack spacing={6} w="full" maxW="800px">
            <Heading size="lg" textAlign="center">
              Available Therapists
            </Heading>

            {therapists.length > 0 ? (
              therapists.map((therapist) => (
                <Card
                  key={therapist.id}
                  w="full"
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="md"
                  _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
                  transition="0.2s"
                  bg={useColorModeValue("white", "gray.800")}
                >
                  <CardBody>
                    <HStack justify="space-between" align="center">
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold">{therapist.email}</Text>
                        <Text fontSize="sm" color="gray.500">
                          Licensed Massage Therapist
                        </Text>
                      </VStack>
                      <Button
                        colorScheme="teal"
                        onClick={() => handleBookAppointment(therapist.id)}
                      >
                        Book Appointment
                      </Button>
                    </HStack>
                  </CardBody>
                </Card>
              ))
            ) : (
              <Text>No therapists available at the moment.</Text>
            )}
          </VStack>
        )}
      </Box>
    </Box>
  );
}
