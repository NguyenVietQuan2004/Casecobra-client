"use client";
import { useEffect, useState } from "react";
import BookingCalendar from "./Calender";

function Booking() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="p-10 w-full text-center">Loading . . . </div>;
  }
  return (
    <div>
      <BookingCalendar />
    </div>
  );
}

export default Booking;
