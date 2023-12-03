import { Box, Button, Checkbox, Card } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PopupTask from "./createTask";
import { Api } from "../libs/api";
import { get } from "mongoose";

export default function MiddleBar() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleSubmit = async (data: FormData) => {
    const postTask = await Api.post("/create/task", data);
    console.log("Form Data:", data);
    // Close the popup after submission
    closePopup();
  };
  const [tasks, setTask] = useState([]);
  const getTask = async (data: FormData) => {
    try {
      const response = await Api.get("/task");
      const data = response.data;
      setTask(data);
    } catch (err) {
      throw new Error();
      console.log(err);
    }
  };
  useEffect(() => {
    getTask(data);
  }, []);
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
          <Button onClick={openPopup} mb={"50px"} width={"50%"}>
            Add a New Task
          </Button>
          {isPopupOpen && (
            <PopupTask onClose={closePopup} onSubmit={handleSubmit} />
          )}
        </Box>
        {/* Maping here */}
        {tasks.map((task) => (
          <div key={task._id}>
            <Card>
              <p>Description: {task.description}</p>
              <p>Status: {task.status ? "Completed" : "Not Completed"}</p>
              <p>Category: {task.category}</p>
              <p>Created At: {task.createdAt}</p>
            </Card>
          </div>
        ))}
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
