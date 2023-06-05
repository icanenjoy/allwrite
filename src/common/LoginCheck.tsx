import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

const LoginCheck = () => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken === null || refreshToken === null) navigate("/");
  }, [refreshToken, accessToken]);

  return <header></header>;
};

export default LoginCheck;
