import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";

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

    // confirmPassword 값을 제외한 formData 객체 생성
    const data = {
      email: formData.email,
      password: formData.password,
      nickName: formData.nickName,
      name: formData.name,
    };

    // 회원가입 처리 논리 구현
    axios
      .post("http://34.64.145.63:5000/api/v1/user", data)
      .then((response) => {
        alert(response.data); // 응답 데이터를 표시
      })
      .catch((err) => alert(String(err))); // 에러 객체를 문자열로 변환하여 표시

    console.log("Submit:", data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>NickName:</label>
        <input
          type="text"
          name="nickName"
          value={formData.nickName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
