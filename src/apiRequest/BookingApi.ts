import { http } from "~/lib/http";
export const bookingApi = {
  getListReserved() {
    return http.get("http://localhost:5000/list/getall");
  },
  addBooking(data: any) {
    return http.post("http://localhost:5000/booking/add", data, {
      credentials: "include",
    });
  },
};
