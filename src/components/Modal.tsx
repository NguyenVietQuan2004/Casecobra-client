"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar, CalendarSelected } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import ModalConfirm from "./ModalConfirm";
import { cn, formatReservedDate, getItemBookingNotFull, hashRole } from "~/lib/utils";
import { bookingApi } from "~/apiRequest/BookingApi";
import { toast } from "./ui/use-toast";

const a = ["Sat Jul 16 2024 00:00:00 GMT+0700 (Giờ Đông Dương)", "Sat Jul 9  2024 00:00:00 GMT+0700 (Giờ Đông Dương)"];
function Modal({ className }: { className: string }) {
  const handleButtonCheckIn = () => {};
  const [selectedDates, setSelectedDates] = useState<CalendarSelected[] | undefined>([]);
  const [user, setUser] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [acceptDate, setAcceptDate] = useState(false);
  const [newListFromServer, setNewListFromServer] = useState([]);
  const [listHours, setListHours] = useState<Array<string>>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // lấy thông tin đăng nhập của user
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("user");
      if (data) {
        const userParse = JSON.parse(data);
        if (userParse.email && userParse.userName) {
          setUser(JSON.parse(data));
        }
      }
    }
    // lấy tất cả list trong lần đầu mounted
    const fetchAPI = async () => {
      const allList = await bookingApi.getListReserved();
      setNewListFromServer(allList);
    };
    fetchAPI();
  }, []);
  useEffect(() => {
    const fetchAPI = async () => {
      const allList = await bookingApi.getListReserved();
      setNewListFromServer(allList);
    };
    fetchAPI();
  }, [isDialogOpen, modalConfirm]);
  useEffect(() => {
    if (acceptDate) {
      const fetchAPI = async () => {
        if (!selectedDates) return;
        try {
          // api đặt lịch
          const userNewList = await bookingApi.addBooking({ date: selectedDates[0], hours: listHours });
          userNewList.role = await hashRole(userNewList.role);
          localStorage.setItem("user", JSON.stringify(userNewList));
          setSelectedDates(undefined);
          toast({
            title: "Đặt chỗ thành công",
          });
          // api get all list
          console.log(userNewList);
          const allList = await bookingApi.getListReserved();
          setNewListFromServer(allList);
        } catch (error: any) {
          const Error = await error.json();
          if (Error.statusCode === 401) {
            const allList = await bookingApi.getListReserved();
            setNewListFromServer(allList);
          }
          toast({
            title: "Booking thất bại",
            description: "Chỗ không khả dụng",
            variant: "destructive",
          });
        }
        // router.refresh
      };
      fetchAPI();
    }
  }, [acceptDate]);
  // nếu chưa có user thì bắt nó đăng nhập
  if (!user) {
    return (
      <div className={className}>
        <Dialog>
          <DialogTrigger asChild>
            <div className="absolute z-[120] top-[66%] left-1/2 translate-x-[-50%] ">
              <Button
                onClick={handleButtonCheckIn}
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "flex items-center gap-1   bg-green-700",
                })}
              >
                Booking now
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="p-8 ">
            <DialogHeader>
              <DialogTitle className="font-normal">You need to sign in or sign up to book date</DialogTitle>
              <DialogDescription className="flex justify-end !mt-6">
                <Link
                  href="/login"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1 mr-2",
                  })}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1",
                  })}
                >
                  Sign up
                </Link>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  const handleDateChange = (e: any) => {
    setAcceptDate(false);
    setSelectedDates(e);
    setModalConfirm(true);
  };
  return (
    <div className="z-[121]">
      <Dialog onOpenChange={(e) => setIsDialogOpen(e)}>
        <DialogTrigger asChild>
          <div className="absolute z-[119] top-[66%] left-1/2 translate-x-[-50%] ">
            <Button
              onClick={handleButtonCheckIn}
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "flex items-center gap-1   bg-green-700",
              })}
            >
              Booking now
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="p-1 pt-8 sm:p-8  z-[122] !max-w-[100vw] sm:!max-w-[50rem]">
          <DialogHeader>
            <DialogTitle className=" font-semibold">Choose one to book date</DialogTitle>
            <DialogDescription className="flex justify-center sm:justify-end !mt-6" asChild>
              <div className="flex items-center">
                <div className="mr-4">
                  <Calendar
                    // sm:!max-w-4xl
                    reserved={formatReservedDate(newListFromServer)}
                    className={`!max-w-[100vw] !w-[100vw] sm:!w-[500px]   `}
                    selected={selectedDates}
                    onChange={handleDateChange}
                    // không thể chọn ngày hôm nay
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center mb-4">
                    <div className="h-[50px] mr-2  w-[50px] flex items-center rounded-xl justify-center bg-[#f2f1ef]">
                      1
                    </div>
                    :<div className="ml-2">Đã được đặt chỗ</div>
                  </div>
                  <span className="mr-2 "> Chúng tôi sẽ liên hệ vói bạn qua số điện thoại để xác nhận.</span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* modal hiện ra để confirm xem đặt lúc nào có đặt không */}
      <ModalConfirm
        setListHours={setListHours}
        open={modalConfirm}
        setAcceptDate={setAcceptDate}
        setModalConfirm={setModalConfirm}
        newList={getItemBookingNotFull(newListFromServer)}
        selectedDates={selectedDates}
      />
    </div>
  );
}

export default Modal;
