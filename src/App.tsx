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
import AdminPage from "./pages/AdminPage/AdminPage";
import { useLocalStorage } from "usehooks-ts";
import LoginCheck from "./common/LoginCheck";
import { Login } from "@mui/icons-material";
import HeaderBar from "./common/HeaderBar";
import { Background } from "./common/Background";
import Cloud from "./common/Cloud";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  ); // accessToken

  return (
    <Provider store={store}>
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
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </Background>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
