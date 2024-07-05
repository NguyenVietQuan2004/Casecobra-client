import { http } from "~/lib/http";
export const bookingApi = {
  getListReserved() {
    return http.get("http://localhost:5000/list/getall", {
      cache: "no-cache",
    });
  },
  addBooking(data: any) {
    return http.post("http://localhost:5000/booking/add", data, {
      credentials: "include",
    });
  },
  getListUserBooking(confirm: string, currentPage: number) {
    return http.get(`http://localhost:5000/auth/getalluser?confirm=${confirm}&currentPage=${currentPage}`, {
      cache: "no-cache",
    });
  },
  getUserBooking(email: string) {
    return http.post(
      `http://localhost:5000/auth/getuser`,
      { email },
      {
        cache: "no-cache",
        credentials: "include",
      }
    );
  },
  updateBookingToYes(email: string) {
    return http.put(
      `http://localhost:5000/auth/update`,
      {
        email,
      },
      {}
    );
  },
  deleteListBookingOfUser(email: string) {
    return http.delete(
      `http://localhost:5000/auth/delete`,
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
      `http://localhost:5000/auth/unlock`,
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
