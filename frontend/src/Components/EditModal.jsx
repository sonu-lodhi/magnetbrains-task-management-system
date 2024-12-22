import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

const EditModal = ({ isOpen, onClose, taskId }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
    priority: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/task/${taskId}`
        );
        setTaskData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
        toast({
          title: "Error",
          description: "Failed to fetch task details. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      }
    };

    if (isOpen && taskId) {
      fetchTask();
    }
  }, [isOpen, taskId, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:5000/task/update/${taskId}`,
        taskData
      );
      setLoading(false);
      toast({
        title: "Success",
        description: "Task updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} style={{background:'#9211e6'}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={taskData.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={taskData.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Due Date</FormLabel>
              <Input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Status</FormLabel>
              <Input
                type="text"
                name="status"
                value={taskData.status}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Priority</FormLabel>
              <Input
                type="text"
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" isLoading={loading}>
              Update Task
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
