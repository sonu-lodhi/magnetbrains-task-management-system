import React, { useContext, useState } from "react";
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
  Text
} from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser, isAuth, setIsAuth, setToken } = useContext(AppContext);
  const toast = useToast();

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        {
          email,
          password,
        }
      );
      console.log("Login successful:", response.data);
      localStorage.setItem("Token", response.data.token);
      loginUser(email, response.token);
      setToken(response.token);
      toast({
        title: "Login Successful",
        description: "You have successfully Login.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Login Error",
        description: "An error occurred while Login. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  if (isAuth == true) {
    return <Navigate to="/" />;
  }

  return (
    <Box style={{background:'#9211e6'}} p={6} boxShadow="md" borderRadius="md" maxW="md" mx="auto" mt={"50px"}>
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Login
      </Heading>
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
        onClick={handleLogin}
        disabled={loading}
        width="100%"
        mb={2}
      >
        {loading ? <Spinner size="sm" color="white" /> : "Login"}
      </Button>
      <Text mt={4} textAlign="center">
        Don't have a account? <Link to="/signup" color="red">Signup</Link>
      </Text>
    </Box>
  );
};

export default Signup;
