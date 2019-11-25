import React from "react";
import ReactDOM from "react-dom";
import { useCalendar, useSelectDate } from "./useDateRange";

function CalendarExample() {
  const datePicker = useSelectDate();
  const {
    getCurrentMonth,
    decrementMonth,
    incrmentMonth,
    setCalendar
  } = useCalendar({
    datePicker
  });
  return (
    <>
      <div>
        {datePicker.date.toLocaleDateString("en-IE")} is the currently selected
        date
      </div>
      <button onClick={decrementMonth}>&lt;- Last month</button>
      <button
        onClick={() =>
          setCalendar(new Date().getFullYear(), new Date().getMonth())
        }
      >
        Today
      </button>
      <button onClick={incrmentMonth}>Next Month -></button>
      <ul>
        {getCurrentMonth().map(day => {
          const { date, isSelected, onSelectDay } = day.getDayProps();
          return (
            <li>
              {date.toLocaleDateString("en-IE")}{" "}
              {isSelected ? (
                "Selected"
              ) : (
                <button onClick={onSelectDay}>Select</button>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function App() {
  return <CalendarExample />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
