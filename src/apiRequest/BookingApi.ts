import { http } from "~/lib/http";
export const bookingApi = {
  getListReserved() {
    return http.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/list/getall`, {
      cache: "no-cache",
    });
  },
  addBooking(data: any) {
    return http.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/booking/add`, data, {
      credentials: "include",
    });
  },
  getListUserBooking(confirm: string, currentPage: number) {
    return http.get(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/auth/getalluser?confirm=${confirm}&currentPage=${currentPage}`,
      {
        cache: "no-cache",
      }
    );
  },
  getUserBooking(email: string) {
    return http.post(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/auth/getuser`,
      { email },
      {
        cache: "no-cache",
        credentials: "include",
      }
    );
  },
  updateBookingToYes(email: string) {
    return http.put(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/auth/update`,
      {
        email,
      },
      {}
    );
  },
  deleteListBookingOfUser(email: string) {
    return http.delete(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/auth/delete`,
      {
        email,
      },
      {
        cache: "no-cache",
      }
    );
  },
  deleteOneDateBookingOfAdmin(date: string) {
    return http.delete(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/auth/unlock`,
      {
        date,
      },
      {
        cache: "no-cache",
        credentials: "include",
      }
    );
  },
  // getUserBooking() {
  //   return http.get("http://localhost:5000/auth/getUser", {
  //     cache: "no-cache",
  //   });
  // },
};
