"use client";
import React, { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";

import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { Button } from "~/components/ui/button";
import Modal from "~/components/ModalConfirm";

const oneDay = 86400000;
const today = new Date().getTime() + oneDay;

export default function BookingCalendar() {
  const [showModal, setShowModal] = useState(false);
  const reserved = Array.from({ length: 3 }, (_, i) => {
    const daysCount = Math.floor(Math.random() * (7 - 4) + 3);
    const startDate = new Date(today + oneDay * 8 * i);

    return {
      startDate,
      endDate: new Date(startDate.getTime() + oneDay * daysCount),
    };
  });

  const [selectedDates, setSelectedDates] = useState([]);
  const handleOnchange = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <MaxWidthWrapper className="flex items-end ">
        <Calendar
          className="flex-1"
          options={{ locale: "en-US" }}
          selected={selectedDates}
          reserved={reserved}
          onChange={handleOnchange}
        />

        <Button className="flex-1">Confirm</Button>
      </MaxWidthWrapper>
      {showModal && <Modal />}
    </>
  );
}
