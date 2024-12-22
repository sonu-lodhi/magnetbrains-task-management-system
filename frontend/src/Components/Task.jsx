import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";

const Task = () => {
  const [form, setForm] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((values) => ({ ...values, [name]: value }));
  };
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/task/create",
        form
      );
      console.log("Task created:", response.data);
      toast({
        title: "Task Created",
        description: "Task created successfully1.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error",
        description: "Failed to create task. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box style={{background:'#9211e6'}} p={4} bg="gray.100" borderRadius="md" w={"30%"}>
      <Heading size="md" mb={4}>
        Create Task
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Due Date</FormLabel>
          <Input
            type="date"
            name="duedate"
            value={form.duedate}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Priority</FormLabel>
          <Select name="priority" value={form.priority} onChange={handleChange}>
          <option>Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Create Task
        </Button>
      </form>
    </Box>
  );
};

export default Task;
