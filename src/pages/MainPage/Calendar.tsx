import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import axios from "axios";
import styled from "styled-components";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { useLocalStorage } from "usehooks-ts";
import { Box, IconButton, Button } from "@mui/material";
import MainProfileImg from "../../asset/img/croco.png";
import ProfileImgAngry from "../../asset/img/crocoangry.png";
import ProfileImgSad from "../../asset/img/crocosad.png";
import ProfileImgLove from "../../asset/img/crocolove.png";
import { useLocation } from "react-router-dom";
import { DisplaySettingsTwoTone } from "@mui/icons-material";

const thismonthemotion: any = {};

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(
  date: Dayjs,
  { signal }: { signal: AbortSignal },
  emotion: any
) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth(); //달의 마지막 날 반환
      const YearMonth = date.format("YYYY-MM"); //현재 해와 달을 알려줌
      const daysToHighlight: number[] = [0];
      for (let i = 0; i < emotion.length; i++) {
        const month = emotion[i].date; //사용자의 감정의 날짜를 가져옴
        if (month.includes(YearMonth)) {
          //이번달과 같으면
          daysToHighlight.push(parseInt(emotion[i].date.slice(8, 10)));
          thismonthemotion[parseInt(emotion[i].date.slice(8, 10))] =
            emotion[i].emotion; // 데이터 출력
        }
      }
      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs();

export default function DateCalendarServerRequest() {
  const location = useLocation();
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [emotion, setEmotion] = useState();
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(initialValue);
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [days, setDays] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [nickName, setNickName] = useState(""); // 페이지 유저아이디
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  ); // accessToken

  const fetchData = async () => {
    if (year !== null && month !== null && days !== null) {
      const date = `${year}-${month.toString().padStart(2, "0")}-${days
        .toString()
        .padStart(2, "0")}`;
      try {
        const response = await axios.get(
          `https://allwrite.kro.kr/api/v1/question/${date}`
        );
        console.log(response.data); // 요청 결과를 콘솔에 출력
        setData(response.data);
        // 여기에서 데이터를 처리하거나 상태를 업데이트할 수 있습니다.
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    if (emotion) {
      fakeFetch(
        date,
        {
          signal: controller.signal,
        },
        emotion
      )
        .then(({ daysToHighlight }) => {
          setHighlightedDays(daysToHighlight);
          setIsLoading(false);
        })
        .catch((error) => {
          // ignore the error if it's caused by `controller.abort`
          if (error.name !== "AbortError") {
            throw error;
          }
        });
    }

    requestAbortController.current = controller;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const nickName = searchParams.get("nickName");
    setNickName(nickName || "");
  }, [location]);

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);

    const emotionLoad = async () => {
      try {
        const response = await axios.get(
          "https://allwrite.kro.kr/api/v1/emotion",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setEmotion(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    emotionLoad();
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };
  function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
  ) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) > 0;

    let dayemotion = "";
    if (isSelected) {
      let day = props.day.date();
      dayemotion = thismonthemotion[day];
    }

    const dayGet = () => {
      setSelectedDate(day);
      console.log(day.year());
      console.log(day.month() + 1);
      console.log(day.date());
      setYear(day.year());
      setMonth(day.month() + 1);
      setDays(day.date());
      fetchData();
    };

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={
          (isSelected && dayemotion === "love" && (
            <img
              src={ProfileImgLove}
              style={{ width: "20px", height: "20px" }}
            ></img>
          )) ||
          (isSelected && dayemotion === "happy" && (
            <img
              src={ProfileImgSad}
              style={{ width: "20px", height: "20px" }}
            ></img>
          )) ||
          (isSelected && dayemotion === "angry" && (
            <img
              src={ProfileImgAngry}
              style={{ width: "20px", height: "20px" }}
            ></img>
          ))
        }
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          onClick={dayGet}
        />
      </Badge>
    );
  }
  return (
    <Container style={nickName ? { marginTop: 0 } : {}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {!nickName && (
          <SelectedDateText
            style={{
              width: "100%",
              color: "#ed7e28",
              marginLeft: "20.5rem",
              marginTop: "-1rem",
            }}
          >
            {selectedDate && `${selectedDate.format("YYYY.MM.DD")}`}
          </SelectedDateText>
        )}
        <DateCalendar
          sx={{
            fontSize: "25rem",
            height: "25rem",
          }}
          defaultValue={initialValue}
          loading={isLoading}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: (slotProps) => (
              <ServerDay
                sx={{
                  fontSize: "1.2rem",
                }}
                {...slotProps}
                highlightedDays={highlightedDays}
              />
            ),
          }}
          slotProps={{
            day: {},
          }}
        />
      </LocalizationProvider>
      {nickName && (
        <SelectedDateText
          style={{
            width: "100%",
            color: "#ed7e28",
            marginTop: "-1rem",
          }}
        >
          {selectedDate && `${selectedDate.format("YYYY.MM.DD")}`}
        </SelectedDateText>
      )}
      {data.map((item, index) => (
        <Button sx={nickName ? mypageButton : mainButton} key={index}>
          {/* 여기에서 데이터를 표시할 JSX를 작성 */}
          <p>{item.content}</p>

          {/* ... */}
        </Button>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 29.5rem;
  height: 5rem;
  margin-top: 4rem;
  justify-content: center;
  text-align: center;
  position: relative;
  font-weight: 750;
  display: block;
`;

const SelectedDateText = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
`;

const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    font-size: 15.5px;
  }
`;

const mainButton = {
  display: "flex",
  alignItems: "center",
  marginLeft: "32rem",
  marginTop: "-9.5rem",
  backgroundColor: "#f9aa43",
  padding: "2rem",
  width: "30rem",
  height: "4rem",
  borderRadius: "1rem",
  color: "#8d3e02",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "#f9aa43",
  },
};

const mypageButton = {
  display: "flex",
  alignItems: "center",
  marginLeft: "0rem",
  marginTop: "2.5rem",
  backgroundColor: "#f9aa43",
  padding: "2rem",
  width: "30rem",
  height: "4rem",
  borderRadius: "1rem",
  color: "#8d3e02",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "#f9aa43",
  },
};
