import React from "react";
import Link from "next/link";

const Register = () => {
  return (
    <>
      <div>
        <div className="bg-custom-gradient min-h-[160px] p-4 text-center sm:p-6">
          <h4 className="text-2xl font-bold text-white sm:text-3xl">
            Đăng ký tài khoản nhà tuyển dụng{" "}
            <Link href="/">
              <span className="text-sky-400">CTU-Works</span>
            </Link>
          </h4>
        </div>

        <div className="mx-4 -mt-16 mb-4">
          <form className="mx-auto max-w-4xl rounded-md bg-white p-4 shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border-none bg-gray-100 px-6 py-3 text-sm font-semibold tracking-wider text-gray-800 outline-none hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  className="mr-3"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>{" "}
                Đăng ký với Google
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border-none bg-gray-100 px-6 py-3 text-sm font-semibold tracking-wider text-gray-800 outline-none hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  className="mr-3"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#039be5"
                    d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                  ></path>
                </svg>
                Đăng ký với Facebook
              </button>
            </div>

            <div className="my-8 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 text-center">Or</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Họ và tên
                </label>
                <input
                  type="text"
                  className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Năm sinh
                </label>
                <input
                  type="date"
                  className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                  placeholder="Nhập tên"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Mật khẩu
                </label>
                <input
                  name="password"
                  type="password"
                  className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Nhập lại mật khẩu
                </label>
                <input
                  name="cpassword"
                  type="password"
                  className="w-full rounded-sm border border-solid border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-500 transition-all focus:bg-transparent"
                  placeholder="Nhập lại mật khẩu"
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                type="button"
                className="w-full rounded-sm bg-blue-500 px-6 py-3 text-sm font-semibold tracking-wider text-white hover:bg-blue-600 focus:outline-none"
              >
                Đăng ký
              </button>
            </div>
            <div className="my-5 text-center">
              <span className="text-gray-500">
                Bạn đã có tài khoản CTU-Works?{" "}
              </span>{" "}
              <button className="ml-2 font-semibold text-blue-600">
                Đăng nhập
              </button>
            </div>
            <div className="my-6 h-[1px] w-full bg-teal-100"></div>
            <div className="text-center">
              <span className="text-gray-500">
                Nếu bạn có nhu cầu tuyển dụng, vui lòng đăng ký tại{" "}
              </span>
              <Link href="/employer/register">
                <button className="text-blue-600">đây</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
