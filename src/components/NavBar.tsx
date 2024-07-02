import Link from "next/link";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { buttonVariants } from "~/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { AuthApi } from "~/apiRequest/AuthApi";

interface User {
  accessToken: string;
  createdAt: string;
  email: string;
  listDateBooked: [];
  role: string;
  updatedAt: string;
  userName: string;
  __v: number;
  _id: string;
}
function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("user");
      if (data) {
        const userFromLocal = JSON.parse(data);
        if (userFromLocal.email && userFromLocal.userName) {
          setUser(userFromLocal);
          const checkRole = async (a: string, b: string) => {
            const resultCompare = await bcrypt.compare(a, b);
            setIsAdmin(resultCompare);
          };
          checkRole("admin", userFromLocal.role);
        }
      }
    }
  }, []);
  const handleSignOut = async () => {
    try {
      await AuthApi.logout();
      await AuthApi.logoutNextServer();
      localStorage.clear();
      setUser(null);
      setIsAdmin(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="sticky z-[10] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between  border-b border-zinc-200">
          <div className="flex items-center">
            <Image alt="snake" src="/snake-1.png" width="30" height="30" className="mr-2"></Image>
            <Link href="/" className="flex z-40 font-semibold">
              case<span className="text-green-600">cobra</span>
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
                <Modal />
                <div>{user.userName}</div>
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
                  })}
                >
                  Login
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                <Modal />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
