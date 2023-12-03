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
  category: string;
  status: boolean;
  date: Date;
}

const PopupTask: React.FC<PopupFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    _id: "",
    description: "",
    category: "",
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
    const response = await Api.get("/category");
    const data = response.data;
    console.log(data);
    setCategory(data);
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          {category.map((item) => (
            <option key={item.description}>{item.description}</option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PopupTask;
