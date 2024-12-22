import React, { useContext } from "react";

import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  useColorModeValue,
  Stack,
  HStack,
  MenuList,
  MenuItem,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const { logoutUser } = useContext(AppContext);

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div>
      <Box
      style={{background:'#9211e6'}}
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        fontSize={"20px"}
        fontWeight={"bold"}
      >
        <Flex
          h={20}
          alignItems={"center"}
          justifyContent={"space-between"}
          padding={"20px"}
        >
          <Box>
            <Link to="/">Task Manager</Link>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Flex>
                <HStack spacing="24px">
                  <Link to={"/"}>Task</Link>
                  <Link to={"/login"}>Login</Link>
                  <Link to={"/signup"}>Signup</Link>
                  <Box>
                    <Menu>
                      <MenuButton>
                        <Flex alignItems={"center"} color="white" gap={2}>
                          <Flex alignItems={"center"} color="white" gap={2}>
                            <Avatar
                              size={"sm"}
                              src={
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                              }
                            />
                          </Flex>
                        </Flex>
                      </MenuButton>

                      <MenuList fontWeight="800px">
                        <MenuItem>
                          <Link to={"/"}>
                            <Text ml={2} onClick={handleLogout}>
                              LogOut
                            </Text>
                          </Link>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                </HStack>
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default Navbar;
