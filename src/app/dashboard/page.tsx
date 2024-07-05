"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthApi } from "~/apiRequest/AuthApi";
import { Button, buttonVariants } from "~/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import bcrypt from "bcryptjs";
import { Spinner } from "~/components/ui/spinner";
import { bookingApi } from "~/apiRequest/BookingApi";
import ModalDetail from "~/components/ModalDetail";
import Link from "next/link";
import ModalAdminConfirm from "./modalAdminConfirm";
import ModalDeleteConfirm from "./modalDeleteConfirm";

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
    const data = await bookingApi.getListUserBooking("no");
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
  const handleDeleteListBook = async (email: string) => {
    try {
      setIsAdmin(false);
      await bookingApi.deleteListBookingOfUser(email);
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

            <Link
              href="/dashboard"
              className={` font-medium ${pathName === "/dashboard" && " font-bold text-green-500"}  tracking-tight  `}
            >
              Incoming orders
            </Link>
            <div className="h-8 w-[2px] mx-4 bg-zinc-200 " />

            <Link href="/dashboard/yes" className=" font-medium tracking-tight">
              Đơn hàng đã xác nhận
            </Link>
            <div className="h-8 w-[2px] mx-4 bg-zinc-200 " />

            <Link href="/dashboard/admin" className="font-medium  tracking-tight">
              Quán lí khóa ngày admin
            </Link>
          </div>
          {listUserNotConfirm.length === 0 ? (
            <div className="flex justify-center mx-10 text-3xl">Danh sách rỗng</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Tổng số tiền <div>( click để xem chi tiết hóa đơn)</div>{" "}
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Số điện thoại </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {listUserNotConfirm.map((order: any) => (
                  <TableRow key={order._id} className="bg-accent cursor-pointer">
                    <TableCell className="">
                      <div className="font-medium">{order.userName}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">{order.email}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex  items-center">
                        <ModalDeleteConfirm handleDeleteListBook={handleDeleteListBook} email={order.email} />

                        <ModalAdminConfirm fetchListUser={fetchListUser} email={order.email} />
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <ModalDetail listDateBooked={order.listDateBooked} userName={order.userName} />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{order.numberPhone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
