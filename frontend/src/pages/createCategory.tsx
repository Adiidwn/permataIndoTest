import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { Api } from "../libs/api";
import { ICategory } from "../interface/iMain";
import PopupTask from "./createTask";

export interface PopupFormProps {
  onClose: () => void;
  onSubmit: (data: ICategory) => void;
}
interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskForm: React.FC<PopupFormProps> = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  const [category, setCategory] = useState<ICategory>({
    _id: "",
    description: "",
    color: "",
    date: new Date(),
  });

  const handleCreateCategory = async () => {
    const response = await Api.post("/create/category");
    const data = response.data;
    console.log(data);
    setCategory(data);
    closePopup();
    // Perform further actions with the selected color data
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onsubmit(category);
  };

  //   const categoryOptions = category.filter(
  //     (data) => data.color !== selectedColor
  //   );
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Task</ModalHeader>
        {isPopupOpen && (
          <PopupTask onClose={closePopup} onSubmit={handleCreateCategory} />
        )}
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                name="description"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Select Color</FormLabel>
              <Select
                value={selectedColor}
                name={selectedColor}
                id={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
                <option value="pink">Pink</option>
                <option value="orange">Orange</option>
                <option value="brown">Brown</option>
                <option value="gray">Gray</option>
              </Select>
            </FormControl>
          </Stack>
          <Button
            mt={4}
            colorScheme="teal"
            onClick={handleCreateCategory} // Change this to handleColorListSubmit for color form
          >
            Submit
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

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
