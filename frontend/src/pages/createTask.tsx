// PopupForm.tsx
import React, { useState } from "react";

interface PopupFormProps {
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  description: string;
  category: string;
}

const PopupTask: React.FC<PopupFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    description: "",
    category: "",
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
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>

        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PopupTask;
