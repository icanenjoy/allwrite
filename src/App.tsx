import React from "react";
import "./App.css";
import {
  Routes,
  BrowserRouter,
  Route,
  Link,
  useLocation,
  redirect,
} from "react-router-dom";
import ButtonAppBar from "./common/ButtonAppBar";
import MainPage from "./pages/MainPage/MainPage";
import AnswerPage from "./pages/AnswerPage/AnswerPage";
import MyPage from "./pages/MyPage/MyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/answer" element={<AnswerPage />} />
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
