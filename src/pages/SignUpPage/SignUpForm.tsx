import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import jwtDecode, { JwtPayload } from "jwt-decode";
import crocosun from "../../asset/img/crocoSun.png";

interface SignUpFormState {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
  name: string;
  isPasswordMatched: boolean;
  isEmailVerified: boolean; // New field for email verification
  verificationCode: string; // New field for verification code
}

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpFormState>({
    email: "",
    password: "",
    confirmPassword: "",
    nickName: "",
    name: "",
    isPasswordMatched: true,
    isEmailVerified: false, // Initialize email verification state
    verificationCode: "", // Initialize verification code
  });

  const isPasswordMatched = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const [isIdDuplicated, setIsIdDuplicated] = useState(false);
  const [isNickNameDuplicated, setIsNickNameDuplicated] = useState(false);
  const [checkEmailCode, setCheckEmailCode] = useState<any>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "confirmPassword") {
      const isMatched = isPasswordMatched(formData.password, value);

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        isPasswordMatched: isMatched,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );

  const handleBlur = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      nickName: formData.nickName,
    };

    // 회원가입 처리 논리 구현
    axios.post("https://allwrite.kro.kr/api/v1/user", data).catch((error) => {
      // 회원가입 실패
      if (error.response) {
        if (error.response.data.message === "계정이 이미 가입되어있습니다.") {
          // 아이디가 중복된 경우
          setIsIdDuplicated(true);
        } else {
          setIsIdDuplicated(false);
        }

        if (error.response.data.message === "이미 사용중인 닉네임입니다.") {
          // 닉네임이 중복된 경우
          setIsNickNameDuplicated(true);
        } else {
          setIsNickNameDuplicated(false);
        }
      }
    });
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
          if (error.response.data.message === "계정이 이미 가입되어있습니다.") {
            // 아이디가 중복된 경우
            setIsIdDuplicated(true);
          } else {
            setIsIdDuplicated(false);
          }

          if (error.response.data.message === "이미 사용중인 닉네임입니다.") {
            // 닉네임이 중복된 경우
            setIsNickNameDuplicated(true);
          } else {
            setIsNickNameDuplicated(false);
          }
        } else {
          // 서버 응답이 없는 경우 또는 요청 자체가 실패한 경우
          console.error("회원가입 요청 실패:", error);
        }
      });
  };

  const handleEmailVerification = () => {
    // Send email verification request and handle the response
    // For simplicity, let's assume the verification is successful

    const sendData = {
      email: formData.email,
    };
    axios
      .post("https://allwrite.kro.kr/api/v1/auth/emailAuth", sendData)
      .then((response) => {
        alert("인증번호가 발송되었습니다.");
        const token = response.data.token;
        const tmpCode: string | null = token
          ? jwtDecode<{ authCode: string }>(token).authCode
          : null;

        setCheckEmailCode(tmpCode);
      });
  };

  const verificationCheck = () => {
    if (checkEmailCode === formData.verificationCode) {
      alert("인증이 완료되었습니다.");
      setFormData((prevData) => ({
        ...prevData,
        isEmailVerified: true,
      }));
    } else {
      alert("인증번호가 맞지 않습니다!");
    }
  };

  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      verificationCode: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "2.5rem 1.5rem",
          marginTop: 5,
          borderRadius: 5,
          width: "20rem",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundImage: `url(${crocosun})`,
            width: "12rem",
            marginLeft: "3.3rem",
            height: "10rem",
            backgroundSize: "cover",
            backgroundPosition: "center",
            // 기타 스타일 속성
          }}
        ></div>
        <Grid textAlign="center">
          <div
            style={{
              fontSize: "1.6rem",
              fontWeight: 750,
              zIndex: 11,
              marginBottom: "30px",
              fontFamily: "GangwonEdu_OTFBoldA",
            }}
          >
            회원가입
          </div>
        </Grid>

        <TextField
          sx={{ fontFamily: "GmarketSansMedium" }}
          label="이메일"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          margin="normal"
        />
        {!formData.isEmailVerified ? ( // Display verification code field if email is not verified
          <>
            <Button
              sx={{
                marginTop: 3,
                marginBottom: 2,
                backgroundColor: "#2c9960",
                color: "white",
                fontFamily: "GmarketSansMedium",
                "&:hover": {
                  backgroundColor: "#24794d", // hover 시 변경할 배경색
                },
              }}
              onClick={handleEmailVerification}
            >
              이메일 인증
            </Button>
            <TextField
              label="이메일 인증번호"
              type="text"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleVerificationCodeChange}
              required
              margin="normal"
            />
            <Button
              sx={{
                marginTop: 3,
                marginBottom: 2,
                backgroundColor: "#2c9960",
                color: "white",
                fontFamily: "GmarketSansMedium",
                "&:hover": {
                  backgroundColor: "#24794d", // hover 시 변경할 배경색
                },
              }}
              onClick={verificationCheck}
            >
              인증 확인
            </Button>
          </>
        ) : null}
        <div>
          {isIdDuplicated ? (
            <span style={{ color: "red", fontSize: "13px" }}>
              아이디가 이미 존재합니다.
            </span>
          ) : null}
        </div>
        <TextField
          label="이름"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="닉네임"
          type="text"
          name="nickName"
          value={formData.nickName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          margin="normal"
        />
        <div>
          {isNickNameDuplicated ? (
            <span style={{ color: "red", fontSize: "13px" }}>
              닉네임이 이미 존재합니다.
            </span>
          ) : null}
        </div>
        <TextField
          // sx={{ fontFamily: "GmarketSansMedium" }}
          label="비밀번호"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="비밀번호 확인"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          margin="normal"
        />
        <div>
          {formData.isPasswordMatched ? null : (
            <span style={{ color: "red", fontSize: "13px" }}>
              비밀번호가 일치하지 않습니다.
            </span>
          )}
        </div>

        {formData.isEmailVerified && (
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "1rem",
              backgroundColor: "#2c9960",
              "&:hover": {
                backgroundColor: "#24794d", // hover 시 변경할 배경색
              },
            }}
          >
            시작하기
          </Button>
        )}
      </Box>
    </form>
  );
};

export default SignUpForm;
