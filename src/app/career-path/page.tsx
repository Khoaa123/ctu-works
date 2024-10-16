"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { IoTriangleSharp } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const CareerPath = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const carouselLength = 8;

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  console.log("current", current);
  console.log("count", count);
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url('https://images.vietnamworks.com/images/career-path/banner-background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "400px",
        }}
        className="flex flex-col items-center justify-center gap-3"
      >
        <p className="text-5xl font-bold text-white">
          Tra cứu lộ trình sự nghiệp Review to
          <span className="text-[#ff7d55]"> Renew</span>
        </p>
        <div className="mt-4 flex w-full items-center justify-center gap-3">
          <Select>
            <SelectTrigger className="w-96 bg-white py-5 shadow-none focus:ring-0">
              <SelectValue placeholder="Tất cả địa điểm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hanoi">Hà Nội</SelectItem>
              <SelectItem value="hochiminh">Thành phố Hồ Chí Minh</SelectItem>
              <SelectItem value="cantho">Cần Thơ</SelectItem>
            </SelectContent>
          </Select>
          <button className="rounded-md bg-amber-600 px-4 py-2 text-white transition duration-300 hover:bg-amber-700">
            Tìm kiếm
          </button>
        </div>
      </div>
      <div className="container py-4">
        <div>
          <p className="text-center text-xl font-bold">
            BẠN MUỐN XEM LỘ TRÌNH SỰ NGHIỆP CỦA NGÀNH NGHỀ NÀO
          </p>
          <div className="my-2 grid grid-cols-2 gap-3 py-3 lg:grid-cols-4">
            <Link href="/career-path/sales/intern">
              <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-5 transition-all duration-300 ease-in-out hover:bg-[#d9e6ff]">
                <div className="rounded-full border-2 border-solid border-[#005aff] p-4">
                  <Image
                    src="https://res.cloudinary.com/dija8tzko/image/upload/v1724650329/Ctu-works/c8801822ed69d06f3c4b311251e86c5b_wsoz3e.svg"
                    alt="image"
                    width={60}
                    height={60}
                  />
                </div>
                <p className="font-bold uppercase">bán hàng</p>
                <p className="font-normal">Sales</p>
              </div>
            </Link>

            <Link href="/career-path/humanresource/intern">
              <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-5 transition-all duration-300 ease-in-out hover:bg-[#d9e6ff]">
                <div className="rounded-full border-2 border-solid border-[#005aff] p-4">
                  <Image
                    src="https://res.cloudinary.com/dija8tzko/image/upload/v1724650570/Ctu-works/241fa72a272c308a20492e85c172f164_ihytdx.svg"
                    alt="image"
                    width={60}
                    height={60}
                  />
                </div>
                <p className="font-bold uppercase">nhân sự</p>
                <p className="font-normal">Human Resource</p>
              </div>
            </Link>

            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-5 transition-all duration-300 ease-in-out hover:bg-[#d9e6ff]">
              <div className="rounded-full border-2 border-solid border-[#005aff] p-4">
                <Image
                  src="https://res.cloudinary.com/dija8tzko/image/upload/v1724650798/Ctu-works/456b90700bfc466f09bed46c11871c6a_pwgnp6.svg"
                  alt="image"
                  width={60}
                  height={60}
                />
              </div>
              <p className="font-bold uppercase">Tài chính đầu tư</p>
              <p className="font-normal">Finance</p>
            </div>

            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-5 transition-all duration-300 ease-in-out hover:bg-[#d9e6ff]">
              <div className="rounded-full border-2 border-solid border-[#005aff] p-4">
                <Image
                  src="https://res.cloudinary.com/dija8tzko/image/upload/v1724650808/Ctu-works/a54bc0dcee8020a4f27f9757a5534288_e3yqo9.svg"
                  alt="image"
                  width={60}
                  height={60}
                />
              </div>
              <p className="font-bold uppercase">Dịch vụ khách hàng</p>
              <p className="font-normal">Customer Experience</p>
            </div>
          </div>
          <div className="mx-auto mt-4 h-[1px] w-4/5 bg-[#d5d5d5]"></div>

          <div className="my-2 grid grid-cols-2 gap-3 py-3 lg:grid-cols-4">
            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-5 transition-all duration-300 ease-in-out hover:bg-[#d9e6ff]">
              <div className="rounded-full border-2 border-solid border-[#005aff] p-4">
                <Image
                  src="https://res.cloudinary.com/dija8tzko/image/upload/v1724654894/Ctu-works/b8b3ac775186858660168c45206c5a5d_xc1mbh.svg"
                  alt="image"
                  width={60}
                  height={60}
                />
              </div>
              <p className="font-bold uppercase">Công nghệ thông tin</p>
              <p className="font-normal">IT</p>
            </div>

            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-5 transition-all duration-300 ease-in-out hover:bg-[#d9e6ff]">
              <div className="rounded-full border-2 border-solid border-[#005aff] p-4">
                <Image
                  src="https://res.cloudinary.com/dija8tzko/image/upload/v1724654903/Ctu-works/64fdd6f5d85734a88b61e0014adb7845_chm1o9.svg"
                  alt="image"
                  width={60}
                  height={60}
                />
              </div>
              <p className="font-bold uppercase">Nghiên cứu phát triển</p>
              <p className="font-normal">Research and Development</p>
            </div>

            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-5 transition-all duration-300 ease-in-out hover:bg-[#d9e6ff]">
              <div className="rounded-full border-2 border-solid border-[#005aff] p-4">
                <Image
                  src="https://res.cloudinary.com/dija8tzko/image/upload/v1724654993/Ctu-works/810c26264b2f01bd2d06df88a59227d2_c1eycu.svg"
                  alt="image"
                  width={60}
                  height={60}
                />
              </div>
              <p className="font-bold uppercase">Kế toán/Kiểm toán</p>
              <p className="font-normal">Accounting</p>
            </div>

            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-5 transition-all duration-300 ease-in-out hover:bg-[#d9e6ff]">
              <div className="rounded-full border-2 border-solid border-[#005aff] p-4">
                <Image
                  src="https://res.cloudinary.com/dija8tzko/image/upload/v1724655001/Ctu-works/abac843e2b00d545a263683bc1ed6845_bolt8c.svg"
                  alt="image"
                  width={60}
                  height={60}
                />
              </div>
              <p className="font-bold uppercase">Hành chính/Thư ký</p>
              <p className="font-normal">Administrative</p>
            </div>
          </div>
          <div className="mx-auto mt-4 h-[1px] w-4/5 bg-[#d5d5d5]"></div>

          <div className="my-2 grid grid-cols-2 gap-3 py-3 lg:grid-cols-4">
            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-5 transition-all duration-300 ease-in-out hover:bg-[#d9e6ff]">
              <div className="rounded-full border-2 border-solid border-[#005aff] p-4">
                <Image
                  src="https://res.cloudinary.com/dija8tzko/image/upload/v1724655233/Ctu-works/7660b0d320c9f4c633654bd2104c5221_u0dk4f.svg"
                  alt="image"
                  width={60}
                  height={60}
                />
              </div>
              <p className="font-bold uppercase">Vận hành</p>
              <p className="font-normal">Operation</p>
            </div>

            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-5 transition-all duration-300 ease-in-out hover:bg-[#d9e6ff]">
              <div className="rounded-full border-2 border-solid border-[#005aff] p-4">
                <Image
                  src="https://res.cloudinary.com/dija8tzko/image/upload/v1724655247/Ctu-works/97934cae49bd7f30914cec45f6c89c23_ws2qdb.svg"
                  alt="image"
                  width={60}
                  height={60}
                />
              </div>
              <p className="font-bold uppercase">Tư vấn</p>
              <p className="font-normal">Consultant</p>
            </div>

            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-5 transition-all duration-300 ease-in-out hover:bg-[#d9e6ff]">
              <div className="rounded-full border-2 border-solid border-[#005aff] p-4">
                <Image
                  src="https://res.cloudinary.com/dija8tzko/image/upload/v1724655309/Ctu-works/93adba605a6dd7608a59418bddf24e45_n9rtv9.svg"
                  alt="image"
                  width={60}
                  height={60}
                />
              </div>
              <p className="font-bold uppercase">Sản xuất</p>
              <p className="font-normal">Manufacturing</p>
            </div>

            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-5 transition-all duration-300 ease-in-out hover:bg-[#d9e6ff]">
              <div className="rounded-full border-2 border-solid border-[#005aff] p-4">
                <Image
                  src="https://res.cloudinary.com/dija8tzko/image/upload/v1724655314/Ctu-works/85a1545faf004bc26590ad41b68bdc1e_uia1ge.svg"
                  alt="image"
                  width={60}
                  height={60}
                />
              </div>
              <p className="font-bold uppercase">Phân tích dữ liệu</p>
              <p className="font-normal">Data Analysis</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F7F8FA]">
        <div className="container py-6">
          <div className="flex items-center gap-3">
            <IoTriangleSharp color="#F85A5A" size={22} />
            <p className="text-xl font-bold uppercase">
              Bài viết về lộ trình sự nghiệp
            </p>
          </div>
          <div className="my-8">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {Array.from({ length: carouselLength }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/4"
                  >
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
                          Ông Hoàng Nam Tiến: Không nhất thiết phải làm gà mới
                          biết nước sôi là nóng {index + 1}
                        </p>
                        <p className="my-4">
                          Theo ông Hoàng Nam Tiến, các bạn trẻ, đặc biệt là GenZ
                          nếu như gặp được những người này thì sẽ rút ngắn được
                          rất nhiều thời gian trong hành ...
                        </p>{" "}
                        <div>
                          <span className="text-sm text-[#757575]">
                            “Bắt mạch” Công Sở
                          </span>
                        </div>
                      </div>
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
                  className={current === 0 ? "" : "group-hover:text-yellow-500"}
                />
              </button>
              {Array.from(Array(count).keys()).map((i) => (
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
                  current === count - 1
                    ? "opacity-25 cursor-not-allowed"
                    : "hover:border-yellow-500"
                }`}
                disabled={current === count - 1}
              >
                <FaAngleRight
                  className={
                    current === count - 1 ? "" : "group-hover:text-yellow-500"
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerPath;
