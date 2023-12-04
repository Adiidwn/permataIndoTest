"use client";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../libs/api";

interface IRegist {
  name: String;
  pNumber: String;
  email: String;
  username: String;
  password: String;
}
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState<IRegist>({
    name: "",
    pNumber: "",
    email: "",
    username: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }
  const handleSubmit = async () => {
    const register = await Api.post("/auth/register", form);
    console.log(register);
    setForm(register.data);
    navigate("/");
  };
  console.log(form);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Box>
              <FormControl id="Name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input name="name" onChange={handleChange} type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="pNumber">
                <FormLabel>Phone Number</FormLabel>
                <Input name="pNumber" onChange={handleChange} type="text" />
              </FormControl>
            </Box>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" onChange={handleChange} />
            </FormControl>
            <Box>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input name="username" onChange={handleChange} type="text" />
              </FormControl>
            </Box>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  onChange={handleChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                onClick={handleSubmit}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Register
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link
                  onClick={() => navigate("/auth/login")}
                  color={"blue.400"}
                >
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
