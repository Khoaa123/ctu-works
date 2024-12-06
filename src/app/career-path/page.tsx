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
        {/* <div className="mt-4 flex w-full items-center justify-center gap-3">
          <Select>
            <SelectTrigger className="w-96 bg-white py-5 shadow-none focus:ring-0">
              <SelectValue placeholder="Tất cả địa điểm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hanoi">Hà Nội</SelectItem>
              <SelectItem value="hochiminh">Thành phố Hồ Chí Minh</SelectItem>
              <SelectItem value="cantho">Cần Thơ 1</SelectItem>
            </SelectContent>
          </Select>
          <button className="rounded-md bg-amber-600 px-4 py-2 text-white transition duration-300 hover:bg-amber-700">
            Tìm kiếm
          </button>
        </div> */}
      </div>
      <div className="container py-4">
        <div>
          <p className="text-center text-xl font-bold">
            BẠN MUỐN XEM LỘ TRÌNH SỰ NGHIỆP CỦA NGÀNH NGHỀ NÀO
          </p>
          <div className="my-2 grid grid-cols-2 gap-3 py-3">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerPath;
