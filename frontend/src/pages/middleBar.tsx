import { Box, Button, Checkbox, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Api } from "../libs/api";
import PopupTask, { FormData } from "./createTask";
import { FormDataCategory } from "./category";

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

  // const [isDelete, setDelete] = useState(false);
  const handleDelete = async (data: FormData) => {
    try {
      const id = data._id;
      await Api.delete(`/task/${id}`);

      // After deletion, update the tasks state to reflect the changes
      setTask((prevTasks) => prevTasks.filter((t) => t._id !== data._id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleCheckboxClick = async (task: FormData) => {
    try {
      const statusChecked = await Api.patch(`/task/${task._id}`, {
        status: !task.status,
      });
      // Toggle the task.status
      task.status = !task.status;
      // Update the local state to trigger a re-render
      setTask([...tasks]);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const getTask = async () => {
    try {
      const response = await Api.get("/task", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const data = response.data;
      setTask(data);
    } catch (err) {
      console.error(err); // Log the error
      throw new Error("Error fetching tasks"); // Throw a new error if needed
    }
  };
  const [category, setCategory] = useState<FormDataCategory[]>([]);
  const getCategory = async () => {
    const response = await Api.get("/category");
    const data = response.data;
    console.log(data);
    setCategory(data);
  };

  useEffect(() => {
    getTask();
    getCategory();
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
          <div key={task._id}>
            <Box
              boxSize={"100%"}
              display={"flex"}
              flex={"column"}
              alignItems={"center"}
              gap={10}
            >
              <Checkbox
                mb={"10px"}
                size={"lg"}
                onChange={() => handleCheckboxClick(task)}
                isChecked={task.status}
              >
                <h1
                  style={{
                    color: task.status ? "red" : "black",
                    textDecoration: task.status ? "line-through" : "none",
                  }}
                >
                  {task.description}
                </h1>
              </Checkbox>
              <p hidden>
                Status: {task.status ? "Completed" : "Not Completed"}
              </p>
              {/* Find the corresponding category object based on the description */}
              {category.map((cat) =>
                cat.description === task.category ? (
                  <h1
                    key={cat._id}
                    style={{
                      backgroundColor: cat.color,
                      border: "1px solid",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "10px",
                      padding: "5px",
                      fontSize: "15px",
                    }}
                  >
                    {task.category}
                  </h1>
                ) : null
              )}
              <IconButton
                icon={<AiOutlineClose />}
                size={"10px"}
                aria-label={""}
                onClick={() => handleDelete(task)}
              />
            </Box>
          </div>
        ))}
      </Box>
    </>
  );
}
