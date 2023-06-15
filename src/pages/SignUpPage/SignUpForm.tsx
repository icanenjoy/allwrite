import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

interface SignUpFormState {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
  name: string;
}

const SignUpForm: React.FC = () => {

  const navigate = useNavigate();

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

  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // confirmPassword 값을 제외한 formData 객체 생성
    const data = {
      email: formData.email,
      password: formData.password,
      nickName: formData.nickName,
      name: formData.name,
    };

    // 회원가입 처리 논리 구현
    axios
      .post("https://allwrite.kro.kr/api/v1/user", data)
      .then((response) => {
        // 회원가입 성공
        setAccessToken(response.data.token.accessToken);
        setRefreshToken(response.data.token.refreshToken);
        alert("회원가입에 성공하였습니다!");
        navigate("/main");
      })
      .catch((error) => {
        // 회원가입 실패
        if (error.response) {
          // 서버 응답이 있는 경우
          console.log("회원가입 실패:", error.response.data.message);
        } else {
          // 서버 응답이 없는 경우 또는 요청 자체가 실패한 경우
          console.error("회원가입 요청 실패:", error);
        }
      });
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
