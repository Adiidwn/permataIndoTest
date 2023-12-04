"use client";

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Api, setAuthToken } from "../../libs/api";
import { ChangeEvent, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ILogin>({
    email: "",
    password: "",
  });

  async function handleSubmit() {
    try {
      console.log("asdsad");

      const response = await Api.post("/auth/login", form);
      const { user, token } = response.data;
      setAuthToken(token);
      console.log("response nih", response);
      console.log("token nih", token);

      localStorage.setItem("token", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.log("error not found ", error);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }
  console.log(form);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" onChange={handleChange} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" onChange={handleChange} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Stack pt={6}>
                <Text
                  align={"center"}
                  onClick={() => navigate("/auth/register")}
                >
                  Don't have an user? <Link color={"blue.400"}>Register</Link>
                </Text>
              </Stack>
            </Stack>
            <Button
              onClick={handleSubmit}
              colorScheme={"blue"}
              variant={"solid"}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
