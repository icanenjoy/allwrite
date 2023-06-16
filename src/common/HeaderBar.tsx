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
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useLocalStorage } from "usehooks-ts";
import queryString from "query-string";
import jwtDecode from "jwt-decode";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "3rem",
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
  color: "black",
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
  const [friendSearch, setFriendSearch] = useState<any>("");
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState<any | null>("");

  const navigate = useNavigate();

  interface Friend {
    nickName: string;
    profileImage: string;
    _id: string;
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
    const friendslistload = async () => {
      try {
        let response = await axios.get(
          "https://allwrite.kro.kr/api/v1/friend/all",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setFriendList(response.data);

        response = await axios.get(
          "https://allwrite.kro.kr/api/v1/friend/request",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setFriendReq(response.data);
      } catch (e) {}
    };

    friendslistload();

    const checkToken = async () => {
      try {
        if (accessToken !== null) {
          setUser(jwtDecode(accessToken));
        }
      } catch (e) {
        console.error("Token decoding error:", e);
      }
    };
    checkToken();
  }, [accessToken]);

  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  const handleFriendOpen = () => {
    //친구목록 열기
    const friendslistload = async () => {
      try {
        let response = await axios.get(
          "https://allwrite.kro.kr/api/v1/friend/all",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setFriendList(response.data);

        response = await axios.get(
          "https://allwrite.kro.kr/api/v1/friend/request",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setFriendReq(response.data);
      } catch (e) {}
    };

    friendslistload();
    setOpen(true);
    handleMobileMenuClose();
  };

  const handleFriendClose = () => {
    setOpen(false);
    setSearchText("");
  };

  const handleMyProfileGo = () => {
    //내 프로필로 이동

    const queryStringParams = queryString.stringify({
      nickName: user.nickName,
    });
    navigate(`/mypage?${queryStringParams}`);
    handleFriendClose();
  };

  const handleHomeGo = () => {
    //홈페이지로 이동
    if (accessToken) navigate("/main");
  };

  const handleMobileMenuClose = () => {
    // 더보기 -> 로고닫기
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    //더보기->로고열기
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleFriendReqOk = async (nickname: string) => {
    //친구요청 수락
    try {
      const response = await axios.post(
        "https://allwrite.kro.kr/api/v1/friend/response",
        {
          friendNickName: nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      handleFriendOpen();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFriendReqDel = async (nickname: string) => {
    //친구요청 거절
    try {
      const response = await axios.delete(
        "https://allwrite.kro.kr/api/v1/friend/reject",
        {
          data: {
            friendNickName: nickname,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      handleFriendOpen();
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyPress = async (e: any) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.get(
          "https://allwrite.kro.kr/api/v1/user/" + searchText,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setFriendSearch(response.data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleFriendPage = (nickName: string) => {
    const queryStringParams = queryString.stringify({
      nickName: nickName,
    });
    navigate(`/mypage?${queryStringParams}`);
    handleFriendClose();
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
            placeholder="검색하기"
            inputProps={{ "aria-label": "search" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Search>
        <List>
          {friendReq.map((friend, index) => (
            <ListItem
              sx={{ fontFamily: "GmarketSansMedium" }}
              button
              key={index}
              onClick={() => {
                handleFriendPage(friend.nickName);
              }}
            >
              <ListItemIcon sx={{ width: 10, height: 30 }}>
                <img
                  src={friend.profileImage}
                  alt={friend.nickName}
                  style={{ borderRadius: "50%" }}
                />
              </ListItemIcon>
              <ListItemText primary={friend.nickName} />

              <IconButton
                sx={{ width: 20, height: 30 }}
                aria-label="check"
                size="large"
                onClick={() => handleFriendReqOk(friend.nickName)}
              >
                <CheckIcon
                  sx={{
                    color: "#1bb36a",
                    "&:hover": {
                      color: "#10683e", // 원하는 호버 시 색상으로 변경
                    },
                  }}
                />
              </IconButton>
              <IconButton
                sx={{ width: 20, height: 30, paddingLeft: "15px" }}
                aria-label="delete"
                size="large"
                onClick={() => handleFriendReqDel(friend.nickName)}
              >
                <DeleteIcon
                  sx={{
                    color: "#1bb36a",
                    "&:hover": {
                      color: "#f53809", // 원하는 호버 시 색상으로 변경
                    },
                  }}
                />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <List>
          {friendList.map((friend, index) => (
            <ListItem
              button
              onClick={() => {
                handleFriendPage(friend.nickName);
              }}
              key={index}
            >
              <ListItemIcon sx={{ width: 20, height: 30 }}>
                <img
                  src={friend.profileImage}
                  alt={friend.nickName}
                  style={{ borderRadius: "50%", width: 30, height: 30 }}
                />
              </ListItemIcon>
              <ListItemText primary={friend.nickName} />
            </ListItem>
          ))}
        </List>
        {searchText && (
          <ListItem
            button
            onClick={() => {
              handleFriendPage(friendSearch.nickName);
            }}
          >
            <ListItemIcon sx={{ width: 20, height: 30 }}>
              <img
                src={friendSearch.profileImage}
                alt={friendSearch.nickName}
                style={{ borderRadius: "50%" }}
              />
            </ListItemIcon>
            <ListItemText primary={friendSearch.nickName} />
          </ListItem>
        )}
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
          backgroundColor: "transparent",
          color: "#2c9960",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleHomeGo}
            sx={{
              ml: "45%",
            }}
          >
            <img
              src={logo}
              alt="로고"
              style={{ width: "117px", height: "81px" }}
            />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, marginBottom: 2 }}>
            {accessToken && (
              <IconButton
                onClick={handleMyProfileGo}
                size="medium"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <AccountCircleIcon sx={iconsize} />
              </IconButton>
            )}
            {accessToken && (
              <IconButton
                onClick={handleFriendOpen}
                size="medium"
                aria-label="show 1 new notifications"
                color="inherit"
              >
                <Badge badgeContent={friendReq.length} color="error">
                  <PeopleOutlineIcon sx={iconsize} />
                </Badge>
              </IconButton>
            )}
            {accessToken && (
              <IconButton
                size="medium"
                edge="end"
                aria-label="account of current user"
                //   aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleLogout}
                color="inherit"
              >
                <LogoutIcon sx={iconsize} />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {accessToken && (
              <IconButton
                size="medium"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

const iconsize = {
  width: 35,
  height: 35,
};
