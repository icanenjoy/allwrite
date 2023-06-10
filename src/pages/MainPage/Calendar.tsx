import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import styled from "styled-components";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import {
  DateCalendar,
  DateCalendarProps,
} from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import rabbit1 from "../../asset/img/croco.png";

const initialValue = dayjs();

// 각 날짜를 나타내는 컴포넌트
function ServerDay(
  props: PickersDayProps<Dayjs> & {
    highlightedDays?: number[];
    selectedDate: Dayjs;
    setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  }
) {
  const {
    highlightedDays = [],
    day,
    outsideCurrentMonth,
    selectedDate,
    setSelectedDate,
    ...other
  } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) > 0;

  const handleClick = () => {
    setSelectedDate(day);
    console.log(day);
  };

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? (
          <img src={rabbit1} alt="rabbit" style={{ width: 16, height: 16 }} />
        ) : undefined
      }

      // style={{ backgroundColor: "red" }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        onClick={handleClick}
      />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(initialValue);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
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

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        <DateCalendar
          defaultValue={initialValue}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: (slotProps) => (
              <ServerDay
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
