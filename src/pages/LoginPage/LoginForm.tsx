import React, { useEffect, useState, useMemo, useCallback } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import styled from "styled-components";
import crocoBack from "./img/croco-back.png";
import crocoFront from "./img/croco-front.png";
import closedCroco from "./img/closed-croco.png";

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
import { setNickName } from "../../store";
import { useDispatch } from "react-redux";

type JwtLoginPayload = JwtPayload & {
  nickName: string;
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
  const [loginStatus, setLoginStatus] = useState<"success" | "failure" | null>(
    "success"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (email !== "" && password !== "") {
      axios
        .post("https://allwrite.kro.kr/api/v1/auth", { email, password })
        .then((response) => {
          setAccessToken(response.data.token.accessToken);
          setRefreshToken(response.data.token.refreshToken);
          setLoginStatus("success");
          dispatch(
            setNickName(
              jwt_decode<JwtLoginPayload>(accessToken as string).nickName
            )
          );
        })
        .then(() => {
          navigate("/main"); // 로그인 성공 시 /main으로 이동
        })
        .catch((err) => {
          setLoginStatus("success");
        });
    }
  }, []);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const crocoPosition = useMemo(() => {
    const emailLength = email.length;
    let top = 50;
    let left = 50;

    if (emailLength <= 4) {
      top = 50 + emailLength * 0.1;
      left = 50 + emailLength * 0.1;
    } else if (4 < emailLength && emailLength <= 23) {
      top = 50.4;
      left = 50.4 + (emailLength - 4) * 0.2;
    } else if (23 < emailLength && emailLength <= 30) {
      top = 50.4 - (emailLength - 23) * 0.1;
      left = 54.2 + (emailLength - 23) * 0.2;
    } else {
      top = 49.7;
      left = 55.5;
    }

    return { top: `${top}%`, left: `${left}%` };
  }, [email]);

  const crocoTop = crocoPosition.top;
  const crocoLeft = crocoPosition.left;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordEmpty(e.target.value === "");
  };

  const data: LoginFormValues = {
    email: email,
    password: password,
  };

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("https://allwrite.kro.kr/api/v1/auth", { email, password })
      .then((response) => {
        setAccessToken(response.data.token.accessToken);
        setRefreshToken(response.data.token.refreshToken);
        setLoginStatus("success");
        dispatch(
          setNickName(
            jwt_decode<JwtLoginPayload>(response.data.token.accessToken)
              .nickName
          )
        );
      })
      .then(() => {
        navigate("/main"); // 로그인 성공 시 /main으로 이동
      })
      .catch((err) => {
        setLoginStatus("failure");
      });
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (accessToken !== null) {
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
    width: 18rem;
    background-image: url(${isPasswordEmpty ? crocoBack : closedCroco});
    background-size: cover;

    ${isPasswordEmpty
      ? `
    &::after {
      content: "";
      position: absolute;
      top: ${crocoTop};
      left:  ${crocoLeft};
      transform: translate(-50%, -50%);
      height: 17rem;
      width: 18rem;
      background-image: url(${crocoFront});
      background-size: cover;
    }
    `
      : ""}
  `);

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: 4,
          marginLeft: 2,
          padding: 3,
          borderRadius: 5,
          position: "absolute",
          width: "20rem",
          zIndex: 10,
        }}
      >
        <Profile />
        <div
          style={{
            fontSize: "1.6rem",
            fontWeight: 750,
            zIndex: 11,
            marginBottom: "30px",
            fontFamily: "GangwonEdu_OTFBoldA",
          }}
        >
          로그인
        </div>
        <Grid>
          <form onSubmit={HandleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="이메일"
                  fullWidth
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="비밀번호"
                  fullWidth
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </Grid>
            </Grid>
            {loginStatus === "failure" && (
              <div
                style={{ fontSize: "0.8rem", fontWeight: 350, color: "red" }}
              >
                <br />
                아이디 또는 비밀번호를 잘못 입력했습니다.
              </div>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 3,
                marginBottom: 2,
                backgroundColor: "#2c9960",
                "&:hover": {
                  backgroundColor: "#24794d", // hover 시 변경할 배경색
                },
              }}
            >
              로그인
            </Button>
          </form>
          <Button
            onClick={handleSignUp}
            variant="contained"
            fullWidth
            sx={{
              marginBottom: 2,
              backgroundColor: "#2c9960",
              "&:hover": {
                backgroundColor: "#24794d", // hover 시 변경할 배경색
              },
            }}
          >
            회원가입
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginForm;
