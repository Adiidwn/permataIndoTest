// PopupForm.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { Category } from "../pages/sideBarLeft";
import { Api } from "../libs/api";
import Color from "../assets/Color.json";

interface CategoryInt {
  onClose: () => void;
  onSubmit: (data: Category) => void;
}

export const getCategoryData = Api.get("/category");

const CategoryPopUp: React.FC<CategoryInt> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Category>({
    color: 0,
    description: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <label htmlFor="color">Color : </label>
                <select
                  id="color"
                  name="color" // Mengganti "category" menjadi "color"
                  value={formData.color}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "200px",
                    margin: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: "8px",
                    border: "1px solid #ccc",
                  }}
                >
                  {Color.map((color) => (
                    <option
                      key={color.idColor}
                      value={color.color}
                      style={{
                        background: `${color.color}`,
                        padding: "8px",
                        marginBottom: "5px",
                        borderRadius: "3px",
                      }}
                    >
                      {color.color}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label htmlFor="description">Description :</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                marginBottom: "10px",
                background: "#EDF2F7",
                resize: "none",
              }}
            />
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button type="submit" onClick={handleSubmit} colorScheme="green">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CategoryPopUp;
