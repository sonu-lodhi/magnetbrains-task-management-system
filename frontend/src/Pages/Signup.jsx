// Signup.js
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Heading,
  useToast,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/user/signup",
        {
          name,
          email,
          password,
        }
      );
      console.log("Signup successful:", response.data);
      toast({
        title: "Signup Successful",
        description: "You have successfully signed up.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Signup Error",
        description:
          "An error occurred while signing up. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box style={{background:'#9211e6'}} p={6} boxShadow="md" borderRadius="md" maxW="md" mx="auto" mt={"50px"}>
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Signup
      </Heading>
      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </FormControl>
      <Button
        colorScheme="blue"
        onClick={handleSignup}
        disabled={loading}
        width="100%"
        mb={2}
      >
        {loading ? <Spinner size="sm" color="white" /> : "Register"}
      </Button>
      <Text mt={4} textAlign="center">
        Already a member? <Link to="/login">Login</Link>
      </Text>
    </Box>
  );
};

export default Signup;
