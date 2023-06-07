import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useLocalStorage } from "usehooks-ts";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "80px",
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  margin: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function HeaderBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = useState(false);
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [friendReq, setFriendReq] = useState<Friend[]>([]);

  const navigate = useNavigate();

  interface Friend {
    friendNickName: string;
    friendProfileImage: string;
    _id?: string;
  }
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  ); // accessToken

  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );

  useEffect(() => {
    //처음에 친구목록 불러오기 //요청도 불러오기

    let response = axios
      .get("http://34.64.145.63:5000/api/v1/friend/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setFriendList(response.data);
      })
      .catch((e) => console.log(e));

    response = axios
      .get("http://34.64.145.63:5000/api/v1/friend/request", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setFriendReq(response.data);
        console.log(friendReq);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  const handleFriendOpen = () => {
    //친구목록 열기
    setOpen(true);
    handleMobileMenuClose();
  };

  const handleFriendClose = () => {
    //^^미완성  //친구목록 닫기
    setOpen(false);
    //navigate('/friend'); 친구꺼 누르면 친구프로필로 이동해야함
  };

  const handleMyProfileGo = () => {
    //내 프로필로 이동
    navigate("/mypage");
  };

  const handleHomeGo = () => {
    //홈페이지로 이동
    navigate("/main");
  };

  const handleMobileMenuClose = () => {
    // 더보기 -> 로고닫기
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    //더보기->로고열기
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleFriendReqDel = (index: number) => {
    //친구요청 거절 근데 API 아직
    //미완성 API 없음
    // const deleteResponse = async () => {
    //   try {
    //     const response = await axios.delete(
    //       "http://34.64.145.63:5000/api/v1/friend/reject",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       }
    //     );
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };
    // deleteResponse();
  };

  const handleFriendReqOk = (nickname: string) => {
    //친구요청 수락 근데 API 아직
    // const friendReq = async () => {
    //   try {
    //     const response = await axios.post(
    //       "http://34.64.145.63:5000/api/v1/friend/response",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //         body: JSON.stringify(nickname),
    //       }
    //     );
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };
    // friendReq();
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          onClick={handleMyProfileGo}
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
          sx={{ padding: "0px" }}
        >
          <AccountCircleIcon sx={{ padding: "12px" }} />
          <p style={{ fontSize: "16px" }}>Profile</p>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleFriendOpen}>
        <IconButton
          size="large"
          aria-label="show 1 new notifications"
          color="inherit"
          sx={{ padding: "0px" }}
        >
          <Badge badgeContent={friendReq.length} color="error">
            <PeopleOutlineIcon sx={{ paddingLeft: "12px" }} />
          </Badge>

          <p style={{ paddingLeft: "12px", fontSize: "16px" }}>friends</p>
        </IconButton>
      </MenuItem>
      <Drawer anchor="right" open={open} onClose={handleFriendClose}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <List>
          {friendReq.map((friend, index) => (
            <ListItem button key={index}>
              <ListItemIcon sx={{ width: 20, height: 30 }}>
                <img
                  src={friend.friendProfileImage}
                  alt={friend.friendNickName}
                />
              </ListItemIcon>
              <ListItemText primary={friend.friendNickName} />

              <IconButton
                sx={{ width: 20, height: 30 }}
                aria-label="check"
                size="large"
                onClick={() => handleFriendReqOk(friend.friendNickName)}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                sx={{ width: 20, height: 30, paddingLeft: "15px" }}
                aria-label="delete"
                size="large"
                onClick={() => handleFriendReqDel(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <List>
          {friendList.map((friend, index) => (
            <ListItem button onClick={handleFriendClose} key={index}>
              <ListItemIcon sx={{ width: 20, height: 30 }}>
                <img
                  src={friend.friendProfileImage}
                  alt={friend.friendNickName}
                />
              </ListItemIcon>
              <ListItemText primary={friend.friendNickName} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <MenuItem onClick={handleLogout}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          sx={{ padding: "0px" }}
        >
          <LogoutIcon sx={{ padding: "12px" }} />
          <p style={{ fontSize: "16px" }}>Logout</p>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          color: "primary.main",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleHomeGo}
          >
            <img src={logo} alt="로고" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              onClick={handleMyProfileGo}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>

            <IconButton
              onClick={handleFriendOpen}
              size="large"
              aria-label="show 1 new notifications"
              color="inherit"
            >
              <Badge badgeContent={friendReq.length} color="error">
                <PeopleOutlineIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              //   aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleLogout}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
