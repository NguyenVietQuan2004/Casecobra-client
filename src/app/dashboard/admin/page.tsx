"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthApi } from "~/apiRequest/AuthApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import bcrypt from "bcryptjs";
import { Spinner } from "~/components/ui/spinner";
import { bookingApi } from "~/apiRequest/BookingApi";
import Link from "next/link";
import ModalDeleteConfirm from "../modalDeleteConfirm";
import { formatDate } from "~/lib/utils";
import Navbar from "~/components/NavBar";

const DashBoard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const [listUserNotConfirm, setListUserNotConfirm] = useState<any>([]);
  const handleSignOut = async () => {
    try {
      await AuthApi.logout();
      await AuthApi.logoutNextServer();
      localStorage.clear();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchListUser = async () => {
    const data = await bookingApi.getUserBooking("admin@gmail.com");
    console.log(data);
    setListUserNotConfirm(data);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchAPI = async () => {
        const hasToken = await AuthApi.checkExistCookie();
        const data = localStorage.getItem("user");
        if (!hasToken.hasAccessToken || !data) {
          handleSignOut();
          router.push("/login");
          return;
        }
        const userFromLocal = JSON.parse(data);
        if (userFromLocal.email && userFromLocal.userName) {
          const checkRole = async (a: string, b: string) => {
            const resultCompare = await bcrypt.compare(a, b);
            if (!resultCompare) return router.push("/notfound");
            setIsAdmin(true);
          };
          checkRole("admin", userFromLocal.role);
        }
      };
      fetchAPI();
    }

    fetchListUser();
  }, []);

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 bg-zinc-100">
        <div className="flex items-center gap-3 justify-center h-[100vh] ">
          <Spinner size="medium" />
        </div>
      </div>
    );
  }
  const handleDeleteListBook = async (date: string) => {
    try {
      setIsAdmin(false);
      await bookingApi.deleteOneDateBookingOfAdmin(date);
      fetchListUser();
      setIsAdmin(true);
    } catch (error) {
      setIsAdmin(true);
    }
  };
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16 p-10 xl:p-0 pt-6">
          <div className="flex items-center">
            <Link href="/" className=" font-medium tracking-tight">
              Trang chủ
            </Link>
            <div className="h-8 w-[2px] mx-4 bg-zinc-200 " />
            <Link href="/dashboard" className="font-medium  tracking-tight">
              Incoming orders
            </Link>
            <div className="h-8 w-[2px] mx-4 bg-zinc-200 " />

            <Link href="/dashboard/yes" className="font-medium  tracking-tight">
              Đơn hàng đã xác nhận
            </Link>
            <div className="h-8 w-[2px] mx-4 bg-zinc-200 " />

            <Link
              href="/dashboard/admin"
              className={` font-medium ${
                pathName === "/dashboard/admin" && " font-bold text-green-500"
              }  tracking-tight  `}
            >
              Quán lí khóa ngày admin
            </Link>
          </div>
          {listUserNotConfirm.length === 0 ? (
            <div className="flex justify-center mx-10 text-3xl">Danh sách rỗng</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ngày</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>

                  <TableHead className="hidden sm:table-cell">Khung giờ </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {listUserNotConfirm[0].listDateBooked.map((order: any) => {
                  return (
                    <TableRow key={order.date} className="bg-accent cursor-pointer">
                      <TableCell className="hidden sm:table-cell">{formatDate(order.date)}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex  items-center">
                          <ModalDeleteConfirm handleDeleteListBook={handleDeleteListBook} email={order.date} />
                        </div>
                      </TableCell>

                      <TableCell className="hidden sm:table-cell">
                        {order.hours.map((hour: any) => {
                          return (
                            <div key={hour} className="">
                              {hour === "1" ? "7h-10h" : hour === "2" ? "13h-17h" : "18h-22h"}
                            </div>
                          );
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
