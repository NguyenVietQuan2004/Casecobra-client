import { http } from "~/lib/http";
export const AuthApi = {
  Login(data: any) {
    return http.post("http://localhost:5000/auth/login", data, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  sendCookieToNextServer(data: any) {
    return http.post("http://localhost:3000/api/auth", data, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  registerAccount(data: any) {
    return http.post("http://localhost:5000/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  logout() {
    return http.post(
      "http://localhost:5000/auth/logout",
      {},
      {
        credentials: "include",
      }
    );
  },
  logoutNextServer() {
    return http.post(
      "http://localhost:3000/api/auth/logout",
      {},
      {
        credentials: "include",
      }
    );
  },
};
