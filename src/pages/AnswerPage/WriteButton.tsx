import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import axios from "axios";

const MAX_CONTENT_LENGTH = 200;

const WriteButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [content, setContent] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = event.target.value;
    if (newContent.length <= MAX_CONTENT_LENGTH) {
      setContent(newContent);
    }
  };

  const handleSave = () => {
    // 작성 완료 버튼을 눌렀을 때 실행될 로직을 여기에 작성하세요.
    const data = {
      content: content,
      isPublic: isPublic,
    };

    // 작성 완료 후 모달을 닫으려면 handleClose() 함수를 호출하세요.
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#FFCF53" }}
        onClick={handleOpen}
      >
        작성하기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paperWidthSm": { maxWidth: "600px" } }}
      >
        <DialogTitle>글 작성</DialogTitle>
        <DialogContent>
          <TextField
            label="내용"
            value={content}
            onChange={handleContentChange}
            multiline
            rows={4}
            fullWidth
            inputProps={{ maxLength: MAX_CONTENT_LENGTH }}
            helperText={`${content.length}/${MAX_CONTENT_LENGTH}`}
            error={content.length > MAX_CONTENT_LENGTH}
          />
          <FormControlLabel
            control={<Switch checked={isPublic} onChange={handleToggle} />}
            label={isPublic ? "전체공개" : "친구공개"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSave}>작성 완료</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WriteButton;
