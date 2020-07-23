import React from "react";
import Calendar from "react-calendar";

export default function MyCalender(props) {
  const { date, onChange } = props;
  return (
    <div>
      <Calendar onChange={onChange} value={date} />
    </div>
  );
}
