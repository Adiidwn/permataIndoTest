// PopupForm.tsx
import React, { useEffect, useState } from "react";
import { Api } from "../libs/api";
import { ICategory } from "../interface/iMain";

export interface PopupFormProps {
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

export interface FormData {
  _id: string;
  description: string;
  category: ICategory;
  status: boolean;
  date: Date;
}

const PopupTask: React.FC<PopupFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    _id: "",
    description: "",
    category: {
      description: "",
      color: "",
      date: new Date(),
      _id: "",
    },
    status: false,
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
    try {
      const response = await Api.get("/category"); // Replace with your actual API endpoint
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div
      className="popup"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          style={{
            borderRadius: "5px",
            border: "1px solid black",
            width: "100%",
          }}
          id="description"
          name="description"
          placeholder="write description here..."
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData?.category.description}
          onChange={handleInputChange}
          required
        >
          <option value={""}></option>
          {category.map((item) => (
            <option key={item.description}>{item.description}</option>
          ))}
        </select>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit">Submit</button>
          <button onClick={onClose}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default PopupTask;
