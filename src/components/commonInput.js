import React, { useState } from "react";
import { Input, Button } from "antd"; // Import Ant Design components

const InputHandler = ({ onSubmit, editMode = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill out all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    onSubmit({ name, email });
    setName(""); // Clear name input after submission
    setEmail(""); // Clear email input after submission
  };

  return (
    <div className="header-box">
      {/* Replace input with Ant Design Input component */}
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* Replace input with Ant Design Input component */}
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Replace button with Ant Design Button component */}
      <Button type="primary" onClick={handleSubmit}>
        {!!editMode ? "Edit user" : "Add user"}
      </Button>
    </div>
  );
};

export default InputHandler;
