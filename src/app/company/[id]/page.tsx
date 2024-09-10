"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import nexon from "@images/nexon.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoSearch } from "react-icons/go";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButotn";

const CompanyDetail = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const jobSectionRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const scrollToJobSection = () => {
    if (jobSectionRef.current) {
      jobSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="bg-[#F1F2F4]">
        <div className="container">
          <div className="pt-5">
            <div className="rounded-md bg-white px-12 py-6">
              <div className="flex justify-between gap-3">
                <Image src={nexon} alt="company" height={100} width={100} />
                <div className="ml-2 flex-1">
                  <p className="text-xl font-semibold">
                    Nexon Networks Vina Co. Ltd,
                  </p>
                  <p className="text-sm">234 lượt theo dõi</p>
                </div>
                <div>
                  <button className="flex flex-1 items-center justify-center rounded-lg bg-[#ff7d55] px-4 py-2 text-sm text-white transition hover:bg-[#fd916f]">
                    Theo dõi
                  </button>
                </div>
              </div>
              <div className="my-10">
                <div className="flex items-center gap-5">
                  <p className="border-2 border-l-0 border-r-0 border-t-0 border-b-blue-500 pb-3 text-sm font-semibold text-blue-500">
                    Về chúng tôi
                  </p>
                  <p
                    className="cursor-pointer pb-3 text-sm text-teal-600 hover:text-blue-500"
                    onClick={scrollToJobSection}
                  >
                    Về vị trí đang tuyển dụng
                  </p>
                </div>
              </div>
              <div>
                <p className="my-6 text-xl font-semibold">Về chúng tôi</p>
                <div className="my-2 grid grid-cols-[100px_auto] gap-4 text-sm">
                  <p className="w-[100px]">Quy mô</p>
                  <p>100 - 499 nhân viên</p>
                </div>
                <div className="my-2 grid grid-cols-[100px_auto] gap-4 text-sm">
                  <p className="w-[100px]">Lĩnh vực</p>
                  <p>Phần Mềm CNTT/Dịch vụ Phần mềm</p>
                </div>
                <div className="my-2 grid grid-cols-[100px_auto] gap-4 text-sm">
                  <p className="w-[100px]">Liên hệ</p>
                  <p>Ms. Oanh</p>
                </div>
                <div className="my-2 grid grid-cols-[100px_auto] gap-4 text-sm">
                  <p className="w-[100px]">Địa chỉ</p>
                  <p>
                    Tòa nhà UOA Tower, 06 Đường Tân Trào, Phường Tân Phú, Quận
                    7, TP. Hồ Chí Minh
                  </p>
                </div>
                <div
                  className={` transition-all duration-400 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-[1000px]" : "max-h-[170px]"
                  }`}
                >
                  <div className="my-4">
                    <p className="text-sm">
                      Nexon Networks VINA, responsible for the uppermost quality
                      of services to our customers by specializing in game
                      quality assurance, was established in Ho Chi Minh, Vietnam
                      in the year 2019. As a proud member of the Nexon Company
                      Group, we utilize our know-hows developed over our history
                      and vast different programs to create an environment where
                      both the company and its employees may advance and
                      concentrate on the goal. The basis and strength behind our
                      rapid growth worldwide derive from our employees. We are
                      expecting passionate, self-challenging and eager
                      individuals to apply and join our journey to success.
                    </p>
                  </div>
                  <div className="my-4">
                    <p className="text-sm">
                      NEXON Group is a Global Company Group well known for
                      developing and servicing MapleStory, Dungeon & Fighter,
                      Sudden Attack, KartRider, FIFA ONLINE 4, V4, AXE, and over
                      60 other major titles in 190 countries worldwide.
                    </p>
                  </div>
                  <div className="my-4 text-sm">
                    <p>We offer</p>
                    <ul className="">
                      <li>
                        Chance to work on global projects with multicultural
                        teams, world-class games
                      </li>
                      <li>Attractive salary and benefits</li>
                      <li>Professional work environment</li>
                      <li>
                        Open culture where every employee is valued, treated
                        fairly, and trusted
                      </li>
                      <li>
                        Open culture where every employee is valued, treated
                        fairly, and trusted
                      </li>
                      <li>
                        Open culture where every employee is valued, treated
                        fairly, and trusted
                      </li>
                      <li>
                        Open culture where every employee is valued, treated
                        fairly, and trusted
                      </li>
                      <li>
                        Open culture where every employee is valued, treated
                        fairly, and trusted
                      </li>
                      <li>
                        Open culture where every employee is valued, treated
                        fairly, and trusted
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  className="text-sm text-blue-500"
                  onClick={toggleExpand}
                >
                  {isExpanded ? "Thu gọn" : "Xem thêm"}
                </button>
                <div ref={jobSectionRef} className="my-6">
                  <p className="text-xl font-semibold">
                    Vị trí đang tuyển dụng
                  </p>
                  <div className="my-6 flex items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-3 rounded-md bg-[#f4f4f7] p-2">
                      <GoSearch />
                      <input
                        type="text"
                        placeholder="Nhập chức danh"
                        className="bg-transparent focus:outline-none focus-visible:ring-0"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="h-10 w-[180px] rounded-md shadow-none focus-visible:ring-0">
                        <SelectValue placeholder="Tất cả địa điểm" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-2 flex flex-col gap-4">
                    <div className="flex items-center gap-5 rounded-md border border-solid border-gray-200 p-4 transition hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <Image src={nexon} alt="" height={80} width={80} />
                      <div>
                        <h1 className="mb-1 line-clamp-1 text-xl font-bold">
                          QA Game Tester
                        </h1>
                        <p>Nexon Networks Vina Co.Ltd</p>
                        <p className="my-1 text-sm text-amber-600">
                          Thương lượng
                        </p>
                        <p className="text-sm">Hồ Chí Minh</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 rounded-md border border-solid border-gray-200 p-4 transition hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <Image src={nexon} alt="" height={80} width={80} />
                      <div>
                        <h1 className="mb-1 line-clamp-1 text-xl font-bold">
                          QA Game Tester
                        </h1>
                        <p>Nexon Networks Vina Co.Ltd</p>
                        <p className="my-1 text-sm text-amber-600">
                          Thương lượng
                        </p>
                        <p className="text-sm">Hồ Chí Minh</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 rounded-md border border-solid border-gray-200 p-4 transition hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <Image src={nexon} alt="" height={80} width={80} />
                      <div>
                        <h1 className="mb-1 line-clamp-1 text-xl font-bold">
                          QA Game Tester
                        </h1>
                        <p>Nexon Networks Vina Co.Ltd</p>
                        <p className="my-1 text-sm text-amber-600">
                          Thương lượng
                        </p>
                        <p className="text-sm">Hồ Chí Minh</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 rounded-md border border-solid border-gray-200 p-4 transition hover:border-sky-200 hover:bg-[#F9FBFF]">
                      <Image src={nexon} alt="" height={80} width={80} />
                      <div>
                        <h1 className="mb-1 line-clamp-1 text-xl font-bold">
                          QA Game Tester
                        </h1>
                        <p>Nexon Networks Vina Co.Ltd</p>
                        <p className="my-1 text-sm text-amber-600">
                          Thương lượng
                        </p>
                        <p className="text-sm">Hồ Chí Minh</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default CompanyDetail;
