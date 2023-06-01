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

function App() {
  return (
    <BrowserRouter>
      <LoginCheck></LoginCheck>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/answer" element={<AnswerPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
