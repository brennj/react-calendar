import { useState } from "react";

export function useDateRange({
  startDate = new Date(),
  endDate = new Date()
} = {}) {
  return {
    startDate,
    endDate
  };
}

export function useSelectDate({ value = new Date() } = {}) {
  const [date, setDate] = useState(value);
  return {
    date,
    getDayProps(d) {
      return {
        date: d,
        isSelected: isSameDay(d, date),
        onSelectDay() {
          setDate(d);
        }
      };
    }
  };
}

function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function useCalendar({
  initialMonth = new Date().getMonth(),
  initialYear = new Date().getFullYear(),
  datePicker
} = {}) {
  if (!datePicker) throw new Error("datePicker property is required");

  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);

  const startOfMonth = new Date(year, month, 0);
  const endOfMonth = new Date(year, month + 1, 0);

  function getCurrentMonth() {
    return Array.from({ length: endOfMonth.getDate() }).map((_, d) => {
      const date = new Date(year, month, d + 1);
      return {
        getDayProps() {
          return datePicker.getDayProps(date);
        }
      };
    });
  }

  function setCalendar(year, month) {
    setYear(year);
    setMonth(month);
  }

  function incrmentMonth() {
    if (month === 12) {
      setCalendar(year + 1, 0);
    } else {
      setMonth(month + 1);
    }
  }

  function decrementMonth() {
    if (month === 0) {
      setCalendar(year - 1, 0);
    } else {
      setMonth(month - 1);
    }
  }

  return {
    startOfMonth,
    setCalendar,
    getCurrentMonth,
    incrmentMonth,
    decrementMonth
  };
}
