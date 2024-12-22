import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Progress,
  Select,
  FormLabel,
  FormControl,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEditId, setSelectedEditId] = useState(null);
  const toast = useToast();
  const [form, setForm] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((values) => ({ ...values, [name]: value }));
  };

  const openModal2 = () => setIsOpenModal2(true);
  const closeModal2 = () => setIsOpenModal2(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/task?page=${currentPage}`
        );
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast({
          title: "Error",
          description: "Failed to fetch tasks. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      }
    };
    fetchTasks();
  }, [currentPage, toast]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/task/delete/${selectedTaskId}`
      );
      toast({
        title: "Success",
        description: "Task Deleted Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/task/update/${selectedEditId}`,
        form
      );
      toast({
        title: "Success",
        description: "Task Updated Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getBackgroundColor = (priority) => {
    switch (priority) {
      case "High":
        return "red.200";
      case "Medium":
        return "yellow.300";
      case "Low":
        return "green.200";
      default:
        return "yellow.300";
    }
  };

  // Pagination
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleStatusUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/task/complete/${id}`
      );
      toast({
        title: "Success",
        description: "Task Completed",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      console.log("Task status updated successfully");
    } catch (error) {
      console.error("Error updating task status:", error);
      toast({
        title: "Error",
        description: "Failed to Complete the task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box  style={{background:'#9211e6'}} p={4} w={"80%"} bg="gray.100" borderRadius="md">
      <Heading size="md" mb={4}>
        Task List
      </Heading>
      {loading ? (
        <Spinner size="xl" color="blue.500" thickness="5px" />
      ) : (
        <>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={4}
          >
            {tasks &&
              tasks.task.map((task, index) => (
                <GridItem key={index}>
                  <Box
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    boxShadow="md"
                    bg={getBackgroundColor(task.priority)}
                  >
                    <Heading size="sm" fontSize={"20px"}>
                      {task.title}
                    </Heading>
                    <Box mt={2}>{task.description}</Box>
                    <Box mt={2}>
                      <b>Due Date</b>: {task.duedate}
                    </Box>
                    <Box mt={2}>
                      <b>Status</b> : {task.status}
                    </Box>
                    <Box mt={2}>
                      <b>Priority</b>: {task.priority}
                    </Box>
                    
                    <Box mt={4} textAlign="right">
                      <Button
                        mr={"5px"}
                        onClick={() => handleStatusUpdate(task._id)}
                      >
                        Mark As Complete
                      </Button>
                      <IconButton
                        icon={<EditIcon />}
                        aria-label="Edit Task"
                        colorScheme="blue"
                        onClick={() => {
                          setSelectedEditId(task._id);
                          openModal2(true);
                        }}
                        mr={2}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Delete Task"
                        colorScheme="red"
                        onClick={() => {
                          setSelectedTaskId(task._id);
                          setShowModal(true);
                        }}
                      />
                    </Box>
                  </Box>
                </GridItem>
              ))}
          </Grid>
          <Box mt={4} textAlign="center">
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              colorScheme="blue"
              mx={1}
            >
              Previous
            </Button>
            <Button onClick={nextPage} colorScheme="blue" mx={1}>
              Next
            </Button>
          </Box>
        </>
      )}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this task?</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleDelete}>
              Yes
            </Button>
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isOpenModal2} onClose={closeModal2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
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
                <FormLabel>Status</FormLabel>
                <Select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </Select>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Priority</FormLabel>
                <Select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option>Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Select>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEdit}>
              Update
            </Button>
            <Button colorScheme="blue" onClick={closeModal2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TaskList;
