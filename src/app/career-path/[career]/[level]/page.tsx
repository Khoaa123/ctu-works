"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxTriangleRight } from "react-icons/rx";
import careerData from "@/utils/CareerData";

interface Params {
  career: string;
  level: string;
}

interface LevelInfo {
  name: string;
  title: string;
  image: string;
}

interface CareerInfo {
  title: string;
  levels: LevelInfo[];
  descriptions: Record<string, string>;
}

const CareerPathDetail = ({ params }: { params: Params }) => {
  const [activeLevel, setActiveLevel] = useState(params.level);
  const pathname = usePathname();
  const career = params.career as keyof typeof careerData;

  useEffect(() => {
    const level = pathname.split("/").pop();
    setActiveLevel(level || params.level);
  }, [pathname, params.level]);

  const careerInfo: CareerInfo = careerData[career];
  const descriptionHtml = careerInfo.descriptions[activeLevel];

  return (
    <div className="bg-[#F7F8FA]">
      <div className="container py-4">
        <p className="text-xl font-extrabold uppercase">{careerInfo.title}</p>
        <div className="relative my-4 flex items-center justify-center gap-3">
          {careerInfo.levels.map((level, index) => (
            <React.Fragment key={level.name}>
              <Link href={`/career-path/${career}/${level.name}`}>
                <LevelImage
                  level={level}
                  isActive={activeLevel === level.name}
                />
              </Link>
              {index < careerInfo.levels.length - 1 && (
                <RxTriangleRight color="#FF7D55" size={22} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="my-8">
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </div>
      </div>
    </div>
  );
};

const LevelImage = ({
  level,
  isActive,
}: {
  level: LevelInfo;
  isActive: boolean;
}) => (
  <div className="group relative cursor-pointer">
    <Image
      src={level.image}
      alt={level.title}
      width={120}
      height={120}
      className="rounded-full"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <p
        className={`flex h-4/5 w-4/5 items-center justify-center rounded-full p-1 text-center text-xs font-bold uppercase transition-all duration-300 ease-in-out
          ${
            isActive
              ? "bg-[#a2f6be] text-black"
              : "bg-[#6298FB] text-white group-hover:bg-[#FBAD95] group-hover:text-white"
          }`}
      >
        {level.title}
      </p>
    </div>
  </div>
);

export default CareerPathDetail;
