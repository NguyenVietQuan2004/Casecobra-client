import { http } from "~/lib/http";
export const AuthApi = {
  Login(data: any) {
    return http.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/auth/login`, data, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  sendCookieToNextServer(data: any) {
    return http.post(`${process.env.NEXT_PUBLIC_API_FRONTEND}/api/auth`, data, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  registerAccount(data: any) {
    return http.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/auth/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  logout() {
    return http.post(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/auth/logout`,
      {},
      {
        credentials: "include",
      }
    );
  },
  logoutNextServer() {
    return http.post(
      `${process.env.NEXT_PUBLIC_API_FRONTEND}/api/auth/logout`,
      {},
      {
        credentials: "include",
      }
    );
  },
  checkExistCookie() {
    return http.post(
      `${process.env.NEXT_PUBLIC_API_FRONTEND}/api/checkexistcookie`,
      {},
      {
        credentials: "include",
      }
    );
  },
};
