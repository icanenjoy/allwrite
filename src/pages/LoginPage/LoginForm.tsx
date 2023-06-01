import React, { useEffect, useState } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
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

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";

type JwtLoginPayload = JwtPayload & {
  name: string;
  isAdmin: Boolean;
  isTempPassword: Boolean;
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 로그인 요청 후 응답에서 토큰을 받아와서 저장하는 코드
    // axios
    //   .post("/api/auth", { email, password })
    //   .then((response) => {
    //     const token = response.data.token;
    //     const decodedToken = jwt_decode<JwtLoginPayload>(token || "") || null; //토큰을 해석
    //     console.log(decodedToken.name); //로그인한 유저의 이름
    //     console.log(decodedToken.isAdmin); //로그인한 유저의 관리자 여부
    //     console.log(decodedToken.isTempPassword); //로그인한 유저의 임시패스워드 여부
    //     saveToken(token);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    axios.get("http://localhost:9999/auth").then((response) => {
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    });
  };

  useEffect(() => {
    try {
      if (accessToken !== "1") {
        console.log(accessToken);
        console.log(jwt_decode<JwtLoginPayload>(accessToken as string));
      }
    } catch (e) {}
  }, [accessToken, refreshToken]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: 8, padding: 3 }}>
        <Avatar sx={{ margin: "auto", backgroundColor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align="center">
          Sign in
        </Typography>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Paper>
      <Button
        onClick={() => {
          setAccessToken("1");
          setRefreshToken("1");
        }}
        variant="contained"
      >
        로그아웃
      </Button>
    </Container>
  );
};

export default LoginForm;
