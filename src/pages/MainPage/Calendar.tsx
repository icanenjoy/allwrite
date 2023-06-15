import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import styled from "styled-components";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import {
  DateCalendar,
  DateCalendarProps,
} from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import croco from "../../asset/img/croco.png";
import { Box, IconButton, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

const initialValue = dayjs();

export default function DateCalendarServerRequest() {
  const location = useLocation();
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState<number[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(initialValue);
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [days, setDays] = useState<number | null>(null);
  const [nickName, setNickName] = useState(""); // 페이지 유저아이디
  const [data, setData] = useState<any[]>([]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    requestAbortController.current = controller;

    // Simulating API request delay
    setTimeout(() => {
      const highlighted = [5, 10, 20];
      setHighlightedDays(highlighted);
      setIsLoading(false);
    }, 100);
  };

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

  useEffect(() => {
    fetchHighlightedDays(initialValue);

    // Abort request on unmount
    return () => {
      if (requestAbortController.current) {
        requestAbortController.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const nickName = searchParams.get("nickName");
    setNickName(nickName || "");
  }, [location]);

  useEffect(() => {
    fetchData();
  }, [year, month, days]);

  const ServerDay = (
    props: PickersDayProps<Dayjs> & {
      highlightedDays?: number[];
      selectedDate: Dayjs;
      setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    }
  ) => {
    const {
      highlightedDays = [],
      day,
      outsideCurrentMonth,
      selectedDate,
      setSelectedDate,
      ...other
    } = props;

    const isSelected =
      !outsideCurrentMonth && highlightedDays.indexOf(day.date()) > -1;

    const handleClick = () => {
      setSelectedDate(day);
      setYear(day.year());
      setMonth(day.month() + 1);
      setDays(day.date());
    };

    return (
      <StyledBadge
        key={day.toString()}
        overlap="circular"
        badgeContent={isSelected ? "😄" : undefined}
        style={{ width: 40, height: 40, fontSize: 40 }}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          onClick={handleClick}
        />
      </StyledBadge>
    );
  };

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
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
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
