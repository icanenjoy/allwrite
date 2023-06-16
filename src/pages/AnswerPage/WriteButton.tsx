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
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocalStorage } from "usehooks-ts";

const MAX_CONTENT_LENGTH = 200;

const WriteButton: React.FC = (onSubmit) => {
  const [open, setOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [content, setContent] = useState("");
  const questionId = useSelector((state: RootState) => state.questionId);

  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );

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
    if (isPublic) {
      var pub = 1;
    } else {
      var pub = 0;
    }
    const data = {
      content: content,
      stateCode: pub,
    };

    axios
      .post(
        `https://allwrite.kro.kr/api/v1/question/answer/${questionId}`,
        data,
        {
          headers: { Authorization: `Bearer ${accessToken}` }, // 수정된 부분
        }
      )
      .then(() => {
        alert("게시글 작성이 완료되었습니다.");
      })
      .then(() => {
        window.location.reload();
      })
      .catch((e) => alert(e));

    // 작성 완료 후 모달을 닫으려면 handleClose() 함수를 호출하세요.
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1bb36a",
          "&:hover": {
            backgroundColor: "#0f864c",
          },
        }}
        onClick={handleOpen}
      >
        작성하기
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paperWidthSm": { maxWidth: "600px" } }}
      >
        <DialogTitle sx={{ fontFamily: "GmarketSansMedium", color: "#1bb36a" }}>
          답변 작성
        </DialogTitle>
        <DialogContent>
          <TextField
            label=""
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
            sx={{
              color: "#1bb36a",
            }}
            control={
              <Switch
                sx={{
                  fontFamily: "GmarketSansMedium",
                  color: "#1bb36a",
                }}
                checked={isPublic}
                onChange={handleToggle}
              />
            }
            label={isPublic ? "전체공개" : "친구공개"}
          />
        </DialogContent>
        <DialogActions
          sx={{
            color: "#1bb36a",
          }}
        >
          <Button
            sx={{
              fontFamily: "GmarketSansMedium",
              backgroundColor: "#1bb36a",
              color: "white",
              "&:hover": {
                backgroundColor: "#0f864c",
              },
            }}
            onClick={handleClose}
          >
            취소
          </Button>
          <Button
            sx={{
              fontFamily: "GmarketSansMedium",
              backgroundColor: "#1bb36a",
              color: "white",
              "&:hover": {
                backgroundColor: "#0f864c",
              },
            }}
            onClick={handleSave}
          >
            작성 완료
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WriteButton;
