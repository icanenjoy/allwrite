import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MessageComponent = () => {
  const messages = ["첫 번째 메시지", "두 번째 메시지", "세 번째 메시지"];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const handlePrevMessage = () => {
    setCurrentMessageIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextMessage = () => {
    setCurrentMessageIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={handlePrevMessage}
        disabled={currentMessageIndex === 0}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          backgroundColor: "skyblue",
          border: "1px solid black",
          borderRadius: 4,
          p: 2,
          width: 300,
          textAlign: "center",
        }}
      >
        {messages[currentMessageIndex]}
      </Box>

      <IconButton
        onClick={handleNextMessage}
        disabled={currentMessageIndex === messages.length - 1}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};

export default MessageComponent;
