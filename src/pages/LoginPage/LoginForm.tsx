import React, { useEffect, useState, useMemo, useCallback } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import styled from "styled-components";
import catImage from "./img/cat.png";
import catBack from "./img/cat-back.png";
import catFront from "./img/cat-front.png";
import closedCat from "./img/closed-cat.png";

import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Avatar,
  Container,
} from "@mui/material";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";

type JwtLoginPayload = JwtPayload & {
  name: string;
  isAdmin: Boolean;
  isTempPassword: Boolean;
};

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);

  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );
  const [loginStatus, setLoginStatus] = useState<"success" | "failure" | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://34.64.145.63:5000/api/v1/auth", data)
      .then((response) => {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        navigate("/main"); // 로그인 성공 시 /main으로 이동
      })
      .catch((err) => {});
  }, []);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );
  
  const catPosition = useMemo(() => {
    const emailLength = email.length;
    let top = 50;
    let left = 50;

    if (emailLength <= 20) {
      top = 50 + emailLength * 0.1;
      left = 50 + emailLength * 0.2;
    } else {
      top = 52 - (emailLength - 20) * 0.1;
      left = 54 + (emailLength - 20) * 0.1;
    }
  
    return { top: `${top}%`, left: `${left}%` };
  }, [email]);

  const catTop = catPosition.top;
  const catLeft = catPosition.left;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordEmpty(e.target.value === "");
  };

  const data: LoginFormValues = {
    email: email,
    password: password,
  };

  const signInData = {
    nickName: "디디",
    name: "김종운",
    email: "cdd@kakao.com",
    password: "#Awoon0325",
  };

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://34.64.145.63:5000/api/v1/auth", data)
      .then((response) => {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setLoginStatus("success");
        navigate("/main"); // 로그인 성공 시 /main으로 이동
      })
      .catch((err) => {
        console.log(data);
        setLoginStatus("failure");
      });
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (accessToken !== null) {
          console.log(accessToken);
          console.log(jwt_decode<JwtLoginPayload>(accessToken as string));
          navigate("/main"); // 토큰이 있을 경우 바로 /main으로 이동
        }
      } catch (e) {
        console.error("Token decoding error:", e);
      }
    };

    checkToken();
  }, []);

  const handleSignUp = () => {
    navigate("/signup"); // 회원가입 페이지로 이동
  };

  const Profile = React.memo(styled.div`
  position: relative;
  height: 17rem;
  width: 17rem;
  background-image: url(${isPasswordEmpty ? catBack : closedCat});
  background-size: cover;

  ${isPasswordEmpty
    ? `
    &::after {
      content: "";
      position: absolute;
      top: ${catTop};
      left: ${catLeft};
      transform: translate(-50%, -50%);
      height: 17rem;
      width: 17rem;
      background-image: url(${catFront});
      background-size: cover;
    }
  `
    : ''}
`);

  return (
    <Container component="main" maxWidth="xs">
      <Paper 
        elevation={3} 
        sx={{display: "flex",
             flexDirection: "column",
             justifyContent: "center",
             alignItems: "center",  
             textAlign: "center", 
             marginTop: 8, 
             padding: 3, 
             borderRadius: 5 }}>
        <div style={{fontSize: "3rem", fontWeight: 750}}>Login</div>
        <Profile/>
        <form onSubmit={HandleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email Address"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Grid>
          </Grid>
          {loginStatus === "failure" && (
            <div style={{fontSize: "0.8rem", fontWeight: 350, color: "red"}}>
              <br/>아이디 또는 비밀번호를 잘못 입력했습니다.
            </div>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            로그인
          </Button>
        </form>
        <Button
          onClick={handleSignUp}
          variant="contained"
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          회원가입
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginForm;