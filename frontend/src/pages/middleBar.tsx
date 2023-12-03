import { Box, Button, Checkbox, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Api } from "../libs/api";
import PopupTask, { FormData } from "./createTask";

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
  const [tasks, setTask] = useState<FormData[]>([]);
  const getTask = async () => {
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
    getTask();
  }, [isPopupOpen]);
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
          <>
            <div key={task._id}>
              <Box
                boxSize={"100%"}
                display={"flex"}
                flex={"column"}
                alignItems={"center"}
                gap={10}
              >
                <Checkbox mb={"10px"} size={"lg"}>
                  <h1>{task.description}</h1>
                </Checkbox>
                <p hidden>
                  Status: {task.status ? "Completed" : "Not Completed"}
                </p>
                <h1
                  style={{
                    backgroundColor: "red",
                    border: "1px solid red",
                    color: "white",
                    borderRadius: "10px",
                    padding: "5px",
                    fontSize: "15px",
                  }}
                >
                  {task.category}
                </h1>
                <IconButton icon={<AiOutlineClose />} size={"10px"} />
              </Box>
              {/* <Card>
                <p>Description: {task.description}</p>
                
                <p>Category: {task.category}</p>
                <p hidden>Created At: {task.createdAt}</p>
              </Card> */}
            </div>
          </>
        ))}
      </Box>
    </>
  );
}
