import { Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ICategory } from "../interface/iMain";
import { Api } from "../libs/api";
export default function SideBar() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const [category, setCategory] = useState<ICategory[]>([]);
  const getCategory = async () => {
    const response = await Api.get("/category");
    const data = response.data;
    console.log(data);
    setCategory(data);
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Box
        ml={"60px"}
        padding={"40px"}
        display={"flex"}
        flexDirection={"column"}
      >
        {category.map((data) => (
          <Button key={data._id}>{data.description}</Button>
        ))}
        <Button
          bg={"white"}
          color={"gray"}
          onClick={openPopup}
          mb={"50px"}
          width={"50%"}
        >
          +New Category
        </Button>

        <TaskForm isOpen={isPopupOpen} onClose={closePopup} />
      </Box>
    </>
  );
}
