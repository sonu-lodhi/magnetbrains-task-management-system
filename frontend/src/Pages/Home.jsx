import React from "react";
import { Flex } from "@chakra-ui/react";
import Task from "../Components/Task";
import TaskList from "../Components/TaskList";


const Home = () => {
  return (
    <>
      <Flex p={4} gap={"40px"}>
        <Task />
        <TaskList />
      </Flex>
    </>
  );
};

export default Home;
