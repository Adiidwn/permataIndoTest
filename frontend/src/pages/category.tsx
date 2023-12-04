// PopupForm.tsx
import React, { useEffect, useState } from "react";
import { Api } from "../libs/api";
import { ICategory } from "../interface/iMain";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  ModalFooter,
} from "@chakra-ui/react";

export interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormDataCategory) => void;
}
export interface FormDataCategory {
  _id?: string;
  description?: string;
  color?: string;
  date?: Date;
}

const PopupTask: React.FC<PopupFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormDataCategory>({
    _id: "",
    description: "",
    color: "",
    date: new Date(),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Popup Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="description">Description:</FormLabel>
              <Input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="color">Color:</FormLabel>
              <Select
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
                <option value="pink">Pink</option>
                <option value="brown">Brown</option>
                <option value="gray">Gray</option>
                {/* Add other color options */}
              </Select>
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              Submit
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PopupTask;
