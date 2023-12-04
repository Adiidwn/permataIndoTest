import { Box, Button, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Api } from "../libs/api";
import PopupTask, { FormDataCategory } from "./category";

export default function SideBar() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleSubmit = async (data: FormDataCategory) => {
    const postCategory = await Api.post("/create/category", data);
    console.log("Form Data:", data);
    // Close the popup after submission
    closePopup();
  };
  const [category, setCategory] = useState<FormDataCategory[]>([]);
  const handleDelete = async (data: FormDataCategory) => {
    try {
      const id = data._id;
      await Api.delete(`/category/${id}`);

      // After deletion, update the tasks state to reflect the changes
      setCategory((prevTasks) => prevTasks.filter((t) => t._id !== data._id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const getCategory = async () => {
    try {
      const response = await Api.get("/category", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const data = response.data;
      setCategory(data);
    } catch (err) {
      throw new Error();
      console.log(err);
    }
  };
  useEffect(() => {
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
        <Box mt={"25px"} mb={"20px"} fontSize="2xl" fontWeight={"bold"}>
          <h5>All Task</h5>
        </Box>
        {category.map((data) => (
          <>
            <div key={data._id}>
              <Box
                boxSize={"100%"}
                display={"flex"}
                flex={"column"}
                alignItems={"center"}
                gap={10}
              >
                <Button bgColor={"white"} mb={"5px"} size={"lg"}>
                  <h1>{data.description}</h1>
                </Button>

                <IconButton
                  onClick={() => handleDelete(data)}
                  icon={<AiOutlineClose />}
                  size={"10px"}
                  aria-label={""}
                />
              </Box>
              {/* <Card>
                <p>Description: {task.description}</p>
                
                <p>Category: {task.category}</p>
                <p hidden>Created At: {task.createdAt}</p>
              </Card> */}
            </div>
          </>
        ))}
        <Box>
          <Button
            bg={"white"}
            color={"gray"}
            onClick={openPopup}
            mb={"50px"}
            width={"50%"}
            _hover={{ bg: "white" }}
          >
            +New Category
          </Button>
          {isPopupOpen && (
            <PopupTask
              isOpen={isPopupOpen}
              onClose={closePopup}
              onSubmit={handleSubmit}
            />
          )}
        </Box>
        {/* Maping here */}
      </Box>
    </>
  );
}
