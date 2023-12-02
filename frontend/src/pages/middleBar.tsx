import { Box, Button, Checkbox, Flex } from "@chakra-ui/react";

export default function MiddleBar() {
  return (
    <>
      <Box
        ml={"60px"}
        padding={"40px"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box mt={"10px"} mb={"20px"} fontSize="4xl" fontWeight={"bold"}>
          <h1>All Task</h1>
        </Box>
        <Box>
          <Button mb={"50px"} width={"50%"}>
            Add a New Task
          </Button>
        </Box>
        {/* Maping here */}
        <Box boxSize={"100%"} display={"flex"} flex={"column"} gap={10}>
          <Checkbox size={"lg"}>
            <h1>Today</h1>
          </Checkbox>
          <h1
            style={{
              backgroundColor: "red",
              border: "2px solid red",
              color: "white",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            Category
          </h1>
        </Box>
      </Box>
    </>
  );
}
