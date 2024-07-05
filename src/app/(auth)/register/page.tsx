"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthApi } from "~/apiRequest/AuthApi";
import { toast } from "~/components/ui/use-toast";

type Inputs = {
  email: string;
  password: string;
  userName: string;
  numberPhone: string;
};
function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await AuthApi.registerAccount(data);
      toast({
        title: "Đăng ký thành công",
      });
      router.push("/login");
    } catch (error) {
      toast({
        title: "Email đã tồn tại",
        description: "Vui lòng dùng email khác",
        variant: "destructive",
      });
    }
  };

  return (
    <div className=" p-0 sm:p-4 flex justify-center items-center bg-[#F2F2F2] h-[100vh]">
      <div className="w-[390px] pt-[50px] px-5 sm:px-[45px] pb-[23px] bg-white  rounded-xl">
        <h2 className="text-center pb-[26px] font-bold text-[28px] sm:text-[32px]">Welcome</h2>
        <div className="h-14 w-14 rounded-sm overflow-hidden mx-auto ">
          <img
            className="object-cover h-full w-full "
            alt=""
            src="https://cdn.thoitiet247.edu.vn/wp-content/uploads/2024/04/nhung-hinh-anh-girl-xinh-de-thuong.webp"
          />
        </div>
        <form className="mb-[80px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-end mt-10">
            <div className="h-12 ">
              <input
                defaultValue=""
                {...register("userName", { required: true })}
                className="pl-2 h-full w-full outline-none  border-b border-gray-500"
                placeholder="Họ và tên"
              />
              {errors.email && <span className="text-red-500">Vui lòng nhập tên</span>}
            </div>
            <div className="h-10 w-2 bg-white" />
            <div className="h-12 ">
              <input
                defaultValue=""
                {...register("numberPhone", { required: true })}
                className="pl-2 h-full w-full outline-none  border-b border-gray-500"
                placeholder="Phone number"
              />
              {errors.email && <span className="text-red-500">Vui lòng nhập email</span>}
            </div>
          </div>
          <div className="h-12 my-6 sm:my-10">
            <input
              defaultValue=""
              {...register("email", { required: true })}
              className="pl-2 h-full w-full outline-none  border-b border-gray-500"
              placeholder="Email"
            />
            {errors.email && <span className="text-red-500">Vui lòng nhập email</span>}
          </div>
          {/* <div>Chúng tôi sẽ xác nhận đơn hàng thông qua số điện thoại vui lòng cung cấp chính xác</div> */}

          <div className="h-12 mb-10">
            <input
              defaultValue=""
              {...register("password", { required: true })}
              className="pl-2 h-full w-full outline-none  border-b border-gray-500"
              placeholder="Password"
            />
            {errors.email && <span className="text-red-500">Vui lòng nhập password</span>}
          </div>
          <button className="text-white w-full h-12 px-5 bg-custom-gradient rounded-3xl">Đăng ký</button>
        </form>
        <div className="text-sm text-center">
          Do have an account?{" "}
          <Link href="/login" className="text-blue-400">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
