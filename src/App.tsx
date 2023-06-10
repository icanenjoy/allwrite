import React, { useEffect } from "react";
import "./App.css";
import {
  Routes,
  BrowserRouter,
  Route,
  Link,
  useLocation,
  redirect,
  useNavigate,
} from "react-router-dom";
import ButtonAppBar from "./common/ButtonAppBar";
import MainPage from "./pages/MainPage/MainPage";
import AnswerPage from "./pages/AnswerPage/AnswerPage";
import MyPage from "./pages/MyPage/MyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { useLocalStorage } from "usehooks-ts";
import LoginCheck from "./common/LoginCheck";
import { Login } from "@mui/icons-material";
import HeaderBar from "./common/HeaderBar";
import { Background } from "./common/Background";
import Cloud from "./common/Cloud";
function App() {
  return (
    <BrowserRouter>
      <LoginCheck></LoginCheck>
      <Background>
        <Cloud />
        <HeaderBar></HeaderBar>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/answer" element={<AnswerPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Background>
    </BrowserRouter>
  );
}

export default App;
