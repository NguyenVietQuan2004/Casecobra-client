"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthApi } from "~/apiRequest/AuthApi";
import { toast } from "~/components/ui/use-toast";
import { hashRole } from "~/lib/utils";
type Inputs = {
  email: string;
  password: string;
};
function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const dataResponse = await AuthApi.Login(data);
      await AuthApi.sendCookieToNextServer(dataResponse.user);
      dataResponse.user.role = await hashRole(dataResponse.user.role);
      localStorage.setItem("user", JSON.stringify(dataResponse.user));
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Tên tài khoản hoặc mật khẩu không chính xác",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-0 sm:p-4 flex justify-center items-center bg-[#F2F2F2] h-[100vh]">
      <div className="w-[390px] pt-[46px] sm:pt-[77px] px-5 sm:px-[45px] pb-[33px] bg-white  rounded-xl h-full">
        <h2 className="text-center pb-[26px] font-bold text-[28px] sm:text-[32px]">Welcome</h2>
        <div className="h-14 w-14 rounded-sm overflow-hidden mx-auto ">
          <img
            className="object-cover h-full w-full "
            alt=""
            src="https://cdn.thoitiet247.edu.vn/wp-content/uploads/2024/04/nhung-hinh-anh-girl-xinh-de-thuong.webp"
          />
        </div>
        <form className="mb-[80px] sm:mb-[115px] " onSubmit={handleSubmit(onSubmit)}>
          <div className="h-12 mt-10">
            <input
              defaultValue=""
              {...register("email", { required: true })}
              className="pl-2 h-full w-full outline-none  border-b border-gray-500"
              placeholder="Email"
            />
          </div>
          <div className="h-12 my-6 sm:my-10">
            <input
              defaultValue=""
              {...register("password", { required: true })}
              className="pl-2 h-full w-full outline-none  border-b border-gray-500"
              placeholder="Password"
            />
          </div>
          <button className="text-white w-full h-12 px-5 bg-custom-gradient rounded-3xl">Đăng nhập</button>
        </form>
        <div className="text-sm text-center">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-400">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
