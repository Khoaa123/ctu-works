"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Image from "next/image";
import nexon from "@images/nexon.png";
import vinfast from "@images/vinfast.png";
import science from "@images/image-science.png";
import io from "socket.io-client";

type CompanyInfo = {
  companyName: string;
  companyLogo: string;
};

type jobPosts = {
  _id: string;
  title: string;
  companyInfo: CompanyInfo;
  jobTitle: string;
  minSalary: number;
  maxSalary: number;
  location: string;
};

const HomePage = () => {
  const items = Array.from({ length: 18 });
  const items2 = Array.from({ length: 27 });
  const [api, setApi] = React.useState<CarouselApi>();
  const [api2, setApi2] = React.useState<CarouselApi>();
  const [api3, setApi3] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [current2, setCurrent2] = React.useState(0);
  const [current3, setCurrent3] = React.useState(0);
  const carouselLength2 = 2;
  const [jobPosts, setJobPosts] = useState<jobPosts[]>([]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  React.useEffect(() => {
    if (!api2) {
      return;
    }

    setCurrent2(api2.selectedScrollSnap());

    api2.on("select", () => {
      setCurrent2(api2.selectedScrollSnap());
    });
  }, [api2]);

  React.useEffect(() => {
    if (!api3) {
      return;
    }

    setCurrent3(api3.selectedScrollSnap());

    api3.on("select", () => {
      setCurrent3(api3.selectedScrollSnap());
    });
  }, [api3]);

  const groupedJobPosts = [];
  for (let i = 0; i < jobPosts.length; i += 9) {
    groupedJobPosts.push(jobPosts.slice(i, i + 9));
  }

  const groupedItems2 = [];
  for (let i = 0; i < items2.length; i += 9) {
    groupedItems2.push(items2.slice(i, i + 9));
  }

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/api/jobpost/get-all-jobpost"
        );
        const data = await res.json();
        if (data.status === "OK") {
          setJobPosts(data.data);
        } else {
          console.error("Failed to fetch job posts");
        }
      } catch (error) {
        console.error("Error fetching job posts:", error);
      }
    };

    fetchJobPosts();
  }, []);

  // const socket = io("http://localhost:3001");
  // const [notification, setNotification] = useState<any>();
  // useEffect(() => {
  //   socket.on("notification", (data) => {
  //     console.log("Socket IO", data);
  //     setNotification((prev: any) => [...prev, data]);
  //   });
  //   return () => {
  //     socket.off("notification");
  //   };
  // }, []);

  return (
    <>
      <div className="container">
        <div className="mt-5">
          <div className="w-full rounded-md border border-solid border-[#ccdeff]">
            <div className="flex justify-between bg-[#f2f7ff]">
              <span className="px-6 py-3 text-xl font-bold">
                Việc Làm Tốt Nhất
              </span>
              <Link href="#">
                <button className="px-6 py-3 uppercase text-blue-500">
                  Xem tất cả
                </button>
              </Link>
            </div>
            <div className="mt-2 px-6 py-3">
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {groupedJobPosts.map((group, index) => (
                    <CarouselItem key={index} className="w-full">
                      <div className="grid grid-cols-3 gap-4">
                        {group.map((job, subIndex) => (
                          <div key={subIndex} className="p-1">
                            <Link href={`/job/${job._id}`}>
                              <div className="flex items-center gap-5 rounded-md border border-solid border-gray-200 p-4 transition hover:border-sky-200 hover:bg-[#F9FBFF]">
                                <Image
                                  src={job.companyInfo?.companyLogo}
                                  alt={job.jobTitle}
                                  height={80}
                                  width={80}
                                />

                                <div>
                                  <h1 className="mb-1 line-clamp-1 text-xl font-bold">
                                    {job.jobTitle}
                                  </h1>
                                  <p>{job.companyInfo?.companyName}</p>
                                  <p className="my-1 text-sm text-amber-600">
                                    {job.minSalary?.toLocaleString()} -{" "}
                                    {job.maxSalary?.toLocaleString()} VNĐ
                                  </p>
                                  <p className="text-sm">{job.location}</p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => api?.scrollTo(current - 1)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 transition ${
                    current === 0
                      ? "opacity-25 cursor-not-allowed"
                      : "group hover:border-yellow-500"
                  }`}
                  disabled={current === 0}
                >
                  <FaAngleLeft
                    className={
                      current === 0 ? "" : "group-hover:text-yellow-500"
                    }
                  />
                </button>
                {groupedJobPosts.map((_, i) => (
                  <div
                    key={i}
                    className={`mx-1 h-2 w-2 rounded-full cursor-pointer ${
                      i === current ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => api?.scrollTo(i)}
                  />
                ))}
                <button
                  onClick={() => api?.scrollTo(current + 1)}
                  className={`flex h-8 w-8 group items-center justify-center rounded-full border border-gray-600 transition ${
                    current === groupedJobPosts.length - 1
                      ? "opacity-25 cursor-not-allowed"
                      : "hover:border-yellow-500"
                  }`}
                  disabled={current === groupedJobPosts.length - 1}
                >
                  <FaAngleRight
                    className={
                      current === groupedJobPosts.length - 1
                        ? ""
                        : "group-hover:text-yellow-500"
                    }
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="my-8">
            <p className="text-xl font-bold">Ngành Nghề Trọng Điểm</p>
            <Carousel
              opts={{
                align: "start",
              }}
              className="my-2 w-full"
            >
              <CarouselContent>
                {Array.from({ length: 10 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/5"
                  >
                    <div className="p-1">
                      <div>
                        <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-[#005aff0d] p-6">
                          <Image src={science} alt="" height={80} width={80} />
                          <span className="text-base font-bold">
                            KHOA HỌC & KỸ THUẬT
                          </span>
                          <span className="text-gray-400">480 việc làm</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>

          <div className="my-8">
            <p className="text-xl font-bold">Nhà Tuyển Dụng Nổi Bật</p>
            <Carousel
              setApi={setApi2}
              opts={{
                align: "start",
              }}
              className="my-2 w-full"
            >
              <CarouselContent>
                {Array.from({ length: carouselLength2 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="h-fit p-1">
                      <div
                        style={{
                          backgroundImage:
                            "url('https://images.vietnamworks.com/logo/panasonic_cpbn_127875.png')",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          width: "100%",
                          height: "350px",
                        }}
                      ></div>
                      <div className="z-50 mx-auto -mt-20 h-fit w-4/5 rounded-md bg-[#f4f4f7] p-5 md:w-3/4">
                        <div className="flex items-center gap-6 rounded-md bg-white p-4">
                          <Image
                            src={nexon}
                            alt="logo"
                            width={100}
                            height={70}
                          />
                          <div className="flex flex-col gap-1">
                            <p className="text-lg font-semibold">
                              Panasonic Việt Nam
                            </p>
                            <p className="text-sm italic text-[#ff7d55]">
                              Making People before Making Products
                            </p>
                            <p className="hidden md:block">
                              Panasonic Vietnam is the first 100% foreign owned
                              company to hold the role of a managing company in
                              Vietnam consisting of 7 companies.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => api2?.scrollTo(current2 - 1)}
                className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 transition ${
                  current2 === 0
                    ? "opacity-25 cursor-not-allowed"
                    : "group hover:border-yellow-500"
                }`}
                disabled={current2 === 0}
              >
                <FaAngleLeft />
              </button>

              <button
                onClick={() => api2?.scrollTo(current2 + 1)}
                className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 transition ${
                  current2 === carouselLength2 - 1
                    ? "opacity-25 cursor-not-allowed"
                    : "group hover:border-yellow-500"
                }`}
                disabled={current2 === carouselLength2 - 1}
              >
                <FaAngleRight />
              </button>
            </div>
          </div>

          <div className="w-full rounded-md border border-solid border-[#ccdeff]">
            <div className="flex justify-between bg-[#f2f7ff]">
              <span className="px-6 py-3 text-xl font-bold">
                Việc Làm Tốt Nhất
              </span>
              <Link href="#">
                <button className="px-6 py-3 uppercase text-blue-500">
                  Xem tất cả
                </button>
              </Link>
            </div>
            <div className="mt-2 px-6 py-3">
              <Carousel
                setApi={setApi3}
                opts={{
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {groupedItems2.map((group, index) => (
                    <CarouselItem key={index} className="w-full">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {group.map((_, subIndex) => (
                          <div key={subIndex} className="p-1">
                            <Link href="/job/1">
                              <div className="flex items-center gap-5 rounded-md border border-solid border-gray-200 p-4 transition hover:border-sky-200 hover:bg-[#F9FBFF]">
                                <Image
                                  src={vinfast}
                                  alt=""
                                  height={80}
                                  width={80}
                                />
                                <div>
                                  <h1 className="mb-1 line-clamp-1 text-xl font-bold">
                                    Inventory Reserve Accountant
                                  </h1>
                                  <p>VINFAST TRADING AND PRODUCTION JSC</p>
                                  <p className="my-1 text-sm text-amber-600">
                                    Thương lượng
                                  </p>
                                  <p className="text-sm">Hải Phòng</p>{" "}
                                  {index * 9 + subIndex + 1}
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => api3?.scrollTo(current3 - 1)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 transition ${
                    current3 === 0
                      ? "opacity-25 cursor-not-allowed"
                      : "group hover:border-yellow-500"
                  }`}
                  disabled={current3 === 0}
                >
                  <FaAngleLeft
                    className={
                      current3 === 0 ? "" : "group-hover:text-yellow-500"
                    }
                  />
                </button>
                {groupedItems2.map((_, i) => (
                  <div
                    key={i}
                    className={`mx-1 h-2 w-2 rounded-full cursor-pointer ${
                      i === current3 ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => api3?.scrollTo(i)}
                  />
                ))}
                <button
                  onClick={() => api3?.scrollTo(current3 + 1)}
                  className={`flex h-8 w-8 group items-center justify-center rounded-full border border-gray-600 transition ${
                    current3 === groupedItems2.length - 1
                      ? "opacity-25 cursor-not-allowed"
                      : "hover:border-yellow-500"
                  }`}
                  disabled={current3 === groupedItems2.length - 1}
                >
                  <FaAngleRight
                    className={
                      current3 === groupedItems2.length - 1
                        ? ""
                        : "group-hover:text-yellow-500"
                    }
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center justify-center gap-8 rounded-md bg-[#ebf2ff] p-4">
              <div className="flex flex-col justify-start gap-2">
                <p className="text-lg font-semibold">Nhân Số Học</p>
                <p className="text-justify text-sm">
                  Công cụ tham khảo nhằm giúp bạn gợi ý nghề nghiệp phù hợp dựa
                  trên những điểm mạnh và điểm yếu của những con số liên quan
                  đến bạn. Dựa trên thông tin: Họ tên, ngày tháng năm sinh của
                  bạn, Nhân số học sẽ phân tích và tạo lập cho bạn biểu đồ sự
                  nghiệp hoàn chỉnh.
                </p>
                <span className="text-blue-600">Xem thêm</span>
              </div>
              <div>
                <svg
                  width="60"
                  height="61"
                  viewBox="0 0 60 61"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_3954_135049)">
                    <path
                      d="M14.5584 38.519H45.5222L38.6864 28.1886L30.0403 15.12L21.3941 28.1877L14.5584 38.519ZM31.0626 29.8265C31.0626 27.8527 32.6687 26.2475 34.6416 26.2475C36.6145 26.2475 38.2207 27.8536 38.2207 29.8265V32.8944C38.2207 34.8682 36.6145 36.4734 34.6416 36.4734C32.6687 36.4734 31.0626 34.8673 31.0626 32.8944V29.8265ZM25.9501 28.2921C25.3863 28.2921 24.9278 28.7506 24.9278 29.3145V30.3368H22.8822V29.3145C22.8822 27.623 24.2586 26.2466 25.9501 26.2466C27.6416 26.2466 29.018 27.623 29.018 29.3145V30.6954L26.0318 34.4279H29.018V36.4734H21.7764L26.9724 29.979V29.3145C26.9724 28.7515 26.5139 28.2921 25.9501 28.2921ZM11.3289 39.1772L1.40625 45.5381V19.33L11.3289 39.1772ZM33.1081 32.8944V29.8265C33.1081 28.9803 33.7964 28.2921 34.6425 28.2921C35.4887 28.2921 36.1769 28.9803 36.1769 29.8265V32.8944C36.1769 33.7406 35.4887 34.4288 34.6425 34.4288C33.7964 34.4288 33.1081 33.7406 33.1081 32.8944ZM29.018 12.3027L4.8273 13.7136H4.82821L29.0189 0.367188L29.018 12.3027ZM14.7382 40.5636L30.0403 60.3672L45.3424 40.5636H14.7382ZM27.9956 51.8128H25.9501V46.3089L24.4702 47.0489L23.555 45.2194L27.9956 42.9996V51.8128ZM32.0858 51.8128V46.3089L30.6059 47.0489L29.6907 45.2194L34.1314 42.9996V51.8128H32.0858ZM55.2533 13.7136L31.0626 12.3018V0.368095L55.2533 13.7136ZM32.0214 14.4073L40.5422 27.2843L47.3026 37.5012V37.5021L58.0896 15.929L32.0214 14.4073ZM41.106 20.4259L43.7998 24.1565C44.0404 24.4888 44.3954 24.7077 44.7995 24.773C45.2044 24.8357 45.6093 24.7403 45.9416 24.5016C46.6271 24.0067 46.7824 23.0453 46.2866 22.3598L44.0223 19.2247L49.8947 16.875L53.3566 21.667L51.6988 22.8646L49.172 19.3673L47.2154 20.1508L47.9454 21.1613C49.1012 22.762 48.7398 25.0036 47.1401 26.1585C46.5082 26.6152 45.7755 26.8349 45.0491 26.8349C43.9378 26.8349 42.842 26.321 42.1438 25.3532L39.4491 21.6234L41.106 20.4259ZM12.7789 37.5012L19.3377 27.5894L28.0601 14.4082L1.99277 15.929L12.7789 37.5012ZM12.0916 20.6084L9.7782 24.0866L8.07493 22.9545L11.959 17.1129L14.6265 20.5348L15.6733 18.9605L17.3757 20.0927L15.9512 22.2345L18.7948 25.8816L17.1823 27.1391L14.7581 24.0303L13.7122 25.6047L12.009 24.4725L13.4335 22.3298L12.0916 20.6084ZM19.226 49.7173L26.5275 59.1669L2.46035 47.2922L10.7288 41.9918L12.4193 40.9077L19.226 49.7173ZM49.044 41.7938L57.6211 47.2931L33.553 59.1669L40.7165 49.8961L47.6612 40.9086L49.044 41.7938ZM58.6743 19.33V45.5372L48.7507 39.1763L58.6743 19.33Z"
                      fill="#4083FF"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_3954_135049">
                      <rect
                        width="60"
                        height="60"
                        fill="white"
                        transform="translate(0 0.365234)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-center gap-8 rounded-md bg-[#ebf2ff] p-4">
              <div className="flex flex-col justify-start gap-2">
                <p className="text-lg font-semibold">Lộ Trình Sự Nghiệp:</p>
                <p className="text-justify text-sm">
                  VietnamWorks giúp bạn đối chiếu được bản thân tháo gỡ lấn cấn
                  chuyện lộ trình thăng tiến. Cùng thoát khỏi mê cung sự nghiệp
                  bằng cách tham khảo lộ trình thăng tiến của tất cả các ngành
                  nghề, bạn nhé!
                </p>
                <span className="text-blue-600">Xem thêm</span>
              </div>
              <div>
                <svg
                  width="60"
                  height="61"
                  viewBox="0 0 60 61"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.874 3.4786C33.3261 3.47503 32.7829 3.57986 32.2757 3.78705C31.7685 3.99423 31.3073 4.29969 30.9186 4.68584C30.53 5.07199 30.2215 5.5312 30.011 6.03704C29.8005 6.54287 29.6922 7.08535 29.6922 7.63323C29.6922 8.18112 29.8005 8.72359 30.011 9.22943C30.2215 9.73527 30.53 10.1945 30.9186 10.5806C31.3073 10.9668 31.7685 11.2722 32.2757 11.4794C32.7829 11.6866 33.3261 11.7914 33.874 11.7879C34.4218 11.7914 34.965 11.6866 35.4722 11.4794C35.9794 11.2722 36.4406 10.9668 36.8293 10.5806C37.218 10.1945 37.5264 9.73527 37.7369 9.22943C37.9474 8.72359 38.0558 8.18112 38.0558 7.63323C38.0558 7.08535 37.9474 6.54287 37.7369 6.03704C37.5264 5.5312 37.218 5.07199 36.8293 4.68584C36.4406 4.29969 35.9794 3.99423 35.4722 3.78705C34.965 3.57986 34.4218 3.47503 33.874 3.4786ZM28.4723 11.9846C28.2378 11.9983 28.0067 12.0385 27.7802 12.1063L22.8561 14.0741C22.1667 14.3497 21.5814 14.8365 21.1823 15.4627L18.7391 19.2967C18.5171 19.645 18.608 20.1065 18.9469 20.3425L20.7202 21.269C21.0802 21.5197 21.5758 21.4209 21.8103 21.0501L23.9418 17.6782L27.9925 16.4886L24.1784 29.0564L18.0271 35.0441C17.7356 35.3278 17.7155 35.7902 17.9807 36.0987L19.8977 38.3275C20.1856 38.6625 20.6955 38.6885 21.0143 38.3828L27.6343 32.0348L30.0178 25.543L35.0812 29.2355L33.9889 38.6216C33.9357 39.079 34.2934 39.4817 34.754 39.4817H37.1994C37.588 39.4817 37.9165 39.1906 37.9645 38.8051L39.1253 29.4633C39.2759 28.2522 38.7724 27.0517 37.8031 26.3103L34.3648 23.6813L35.7357 17.4416L38.1325 19.0535C38.8957 19.5665 39.8766 19.6273 40.6974 19.2127L47.7463 15.6506C48.1448 15.4493 48.2891 14.9528 48.0603 14.5694L46.8464 12.533C46.6427 12.1915 46.2125 12.0611 45.8536 12.2323L39.3088 15.3566L37.1442 13.7557C36.7667 13.4768 36.3282 13.2889 35.8661 13.2074L29.1754 12.0267C28.9426 11.9856 28.7067 11.971 28.4723 11.9846ZM49.5948 19.876C49.3758 19.9045 49.1846 20.0604 49.1216 20.2851C49.0376 20.5863 49.2145 20.8975 49.5152 20.9816L50.7556 21.3309L42.809 25.574C42.5326 25.721 42.4297 26.0637 42.5768 26.339C42.6796 26.5303 42.8753 26.6397 43.0765 26.6397C43.1671 26.6397 43.2567 26.6165 43.3418 26.5712L51.3791 22.2795L51.0032 23.6282C50.9192 23.9289 51.0961 24.2407 51.3968 24.3247C51.4477 24.3391 51.4996 24.3468 51.5494 24.3468C51.797 24.3468 52.0236 24.1815 52.0933 23.9311L52.823 21.3198C52.907 21.0191 52.7323 20.7052 52.4316 20.6211L49.8203 19.8915C49.7449 19.8708 49.6678 19.8665 49.5948 19.876ZM45.9841 32.1652C44.9086 32.1652 44.0494 33.038 44.0494 34.1021V57.2522H56.3894V34.1021C56.3894 33.038 55.5167 32.1652 54.4525 32.1652H45.9841ZM32.5009 39.5348C31.4367 39.5348 30.5662 40.4075 30.5662 41.4717V57.2522H42.9173V39.5348H32.5009ZM19.0199 45.0713C17.9557 45.0713 17.083 45.9419 17.083 47.006V57.2522H29.4341V45.0713H19.0199ZM5.54775 49.2259C4.47233 49.2259 3.61084 50.0965 3.61084 51.1606V57.2522H15.9509V49.2259H5.54775Z"
                    fill="#4083FF"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="my-8">
            <p className="text-xl font-bold">
              Tư vấn nghề nghiệp từ HR Insider
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="group cursor-pointer overflow-hidden rounded-md border border-solid border-[#dbdbdb] transition-all hover:border-[#ff7d55]"
                  key={index}
                >
                  <div
                    style={{
                      backgroundImage:
                        "url('https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fwww.vietnamworks.com%2Fhrinsider%2Fwp-content%2Fuploads%2F2024%2F08%2FHRINSIDER_-Mentor-sharing-1200_900-2.jpg&w=828&q=75')",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      width: "100%",
                      height: "200px",
                    }}
                  ></div>
                  <div className="px-4 py-2">
                    <p className="mt-2 text-base font-bold transition-all duration-200 group-hover:text-[#ff7d55]">
                      Ông Hoàng Nam Tiến: Không nhất thiết phải làm gà mới biết
                      nước sôi là nóng
                    </p>
                    <p className="my-4">
                      Theo ông Hoàng Nam Tiến, các bạn trẻ, đặc biệt là GenZ nếu
                      như gặp được những người này thì sẽ rút ngắn được rất
                      nhiều thời gian trong hành ...
                    </p>{" "}
                    <div>
                      <span className="text-sm text-[#757575]">
                        “Bắt mạch” Công Sở
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
