"use client";
import Link from "next/link";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { Button, buttonVariants } from "~/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { AuthApi } from "~/apiRequest/AuthApi";
import { ChinhsachIcon, HelpIcon, MenuIcon } from "./icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Spinner } from "./ui/spinner";

export interface User {
  accessToken: string;
  createdAt: string;
  email: string;
  listDateBooked: [];
  role: string;
  updatedAt: string;
  userName: string;
  confirm: string;
  __v: number;
  _id: string;
}

function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await AuthApi.logout();
      await AuthApi.logoutNextServer();
      localStorage.clear();
      setUser(null);
      setIsAdmin(false);
      setIsLoggingOut(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchAPI = async () => {
        const hasToken = await AuthApi.checkExistCookie();
        const data = localStorage.getItem("user");
        if (!hasToken.hasAccessToken || !data) {
          handleSignOut();
          return;
        }
        const userFromLocal = JSON.parse(data);
        if (userFromLocal.email && userFromLocal.userName) {
          setUser(userFromLocal);
          const checkRole = async (a: string, b: string) => {
            const resultCompare = await bcrypt.compare(a, b);
            setIsAdmin(resultCompare);
          };
          checkRole("admin", userFromLocal.role);
        }
      };
      fetchAPI();
    }
  }, []);

  return (
    <>
      {isLoggingOut && (
        <div className="fixed inset-0 bg-zinc-300 z-[120] bg-opacity-50 ">
          <div className="flex items-center gap-3 justify-center h-[100vh] ">
            <Spinner size="medium" />
          </div>
        </div>
      )}
      <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex h-14 items-center justify-between  border-b border-zinc-200">
            <div className="flex items-center">
              <Image alt="snake" src="/images/concu.png" width="30" height="30" className="mr-2"></Image>
              <Link href="/" className="flex z-40 font-semibold">
                Home<span className="text-green-600">stay</span>
              </Link>
            </div>
            <div className="h-full flex items-center space-x-4">
              {user ? (
                <>
                  <button onClick={handleSignOut} className="text-[12px]">
                    Sign out
                  </button>
                  {isAdmin ? (
                    <Link
                      href="/dashboard"
                      className={buttonVariants({
                        size: "sm",
                        variant: "ghost",
                      })}
                    >
                      Dashboard ✨
                    </Link>
                  ) : null}
                  {/* <Modal /> */}
                  {!isAdmin && (
                    <>
                      {/* drawer */}
                      <div className="sm:hidden">
                        <Drawer direction="right">
                          <DrawerTrigger asChild>
                            <div>
                              <MenuIcon />
                            </div>
                          </DrawerTrigger>
                          <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                              <DrawerHeader>
                                <DrawerTitle>Menu</DrawerTitle>
                                <DrawerDescription> Thông tin cửa hàng.</DrawerDescription>
                              </DrawerHeader>
                              <div className="p-4 pb-0">
                                <div className="flex items-center justify-center space-x-2"></div>
                                <div className="mt-3 h-[120px]">
                                  <div className="flex items-center py-3">
                                    <ChinhsachIcon /> <span className="ml-2">Chính sách</span>
                                  </div>
                                  <div className="flex items-center py-3">
                                    <HelpIcon /> <span className="ml-2">Chính sách</span>
                                  </div>
                                </div>
                              </div>
                              <DrawerFooter>
                                <Button onClick={() => handleSignOut()}>Đăng xuất</Button>
                                <DrawerClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                              </DrawerFooter>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      </div>
                      <div className="hidden sm:block">
                        <Link
                          className={buttonVariants({
                            size: "sm",
                            variant: "ghost",
                            className: "text-[12px]",
                          })}
                          href="/chinhsach"
                        >
                          Chính sách
                        </Link>
                        <Link
                          className={buttonVariants({
                            size: "sm",
                            variant: "ghost",
                            className: "text-[12px]",
                          })}
                          href="/help"
                        >
                          Hướng dẫn
                        </Link>
                      </div>
                    </>
                  )}
                  <div className="hidden">{user.userName}</div>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Sign up
                  </Link>

                  <Link
                    href="/login"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                      className: "!ml-0 sm:!ml-4",
                    })}
                  >
                    Login
                  </Link>

                  <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                  {/* <Modal /> */}
                  {!isAdmin && (
                    <div className="hidden sm:block">
                      <Link
                        className={buttonVariants({
                          size: "sm",
                          variant: "ghost",
                          className: "text-[12px]",
                        })}
                        href="/chinhsach"
                      >
                        Chính sách
                      </Link>
                      <Link
                        className={buttonVariants({
                          size: "sm",
                          variant: "ghost",
                          className: "text-[12px]",
                        })}
                        href="/help"
                      >
                        Hướng dẫn
                      </Link>
                    </div>
                  )}
                  {/* drawer */}
                  <div className="sm:hidden">
                    <Drawer direction="right">
                      <DrawerTrigger asChild>
                        <div>
                          <MenuIcon />
                        </div>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                          <DrawerHeader>
                            <DrawerTitle>Menu</DrawerTitle>
                            <DrawerDescription> Thông tin cửa hàng.</DrawerDescription>
                          </DrawerHeader>
                          <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-2"></div>
                            <div className="mt-3 h-[120px]">
                              <div className="flex items-center py-3">
                                <ChinhsachIcon /> <span className="ml-2">Chính sách</span>
                              </div>
                              <div className="flex items-center py-3">
                                <HelpIcon /> <span className="ml-2">Chính sách</span>
                              </div>
                            </div>
                          </div>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </>
  );
}

export default Navbar;
