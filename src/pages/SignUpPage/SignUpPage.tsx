import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

interface SignUpFormState {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
  name: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormState>({
    email: "",
    password: "",
    confirmPassword: "",
    nickName: "",
    name: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 회원가입 처리 논리 구현
    axios.post("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="NickName"
          type="text"
          name="nickName"
          value={formData.nickName}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ marginTop: "1rem" }}>
          Sign Up
        </Button>
      </Box>
    </form>
  );
};

export default SignUpForm;
