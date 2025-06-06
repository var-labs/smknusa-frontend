"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Heading, Paragraph } from "@/components/ui/typography";
import { cn } from "@/utils/cn";
import { useElearn } from "@/services/api/useQueries/useElearn";
import { backendUrl } from "@/utils/backendUrl";

const Page = () => {
  const { elearn } = useElearn();

  const imageUrl = elearn?.[0]?.thumbnail ? `${backendUrl}${elearn?.[0].thumbnail}` : "";

  return (
    <div className="flex xl:min-h-screen flex-col items-center gap-3 ">
      <div className="relative mt-[65px] xl:mt-24  h-[16rem] w-full  p-2 xl:p-2.5 overflow-hidden sm:h-[17rem] md:h-[20rem] xl:h-[28rem] 1xl:h-[32.375rem] bg-cover bg-no-repeat"
        style={{backgroundImage: `url(${imageUrl})`}}>
        <div className="relative 1xl:pb-6 h-full w-full flex justify-center overflow-hidden">
          <div className="inset-0 flex flex-col items-center justify-center text-white px-8  max-w-full md:max-w-md-content lg:max-w-lg-content xl:max-w-full  z-20  w-full">
            <div className=" flex flex-col items-center container xl:pt-16 gap-6">
              <Heading
                type="h1"
                className={cn("xl:!text-[46px] text-center lg:!text-[32px] ")}
              >
                {elearn?.[0]?.title}
              </Heading>
              <Heading
                type="h5"
                className="text-center font-medium text-xs lg:text-base xl:text-[18px] md:w-[28rem] lg:w-[38rem] xl:w-[708px]"
              >
               {elearn?.[0]?.desc}
              </Heading>
              <div className="flex justify-center gap-3 xl:gap-6 items-center">
                <button className="px-6 py-2 bg-white rounded-lg flex justify-center items-center gap-4">
                  <Image
                    src={backendUrl + elearn?.[0]?.btn_icon || ""}
                    alt="teams"
                    draggable={false}
                    width={30}
                    height={30}
                    className="w-[27px] "
                  />
                  <Link
                    href={
                      elearn?.[0]?.btn_url || ""
                    }
                    className="font-medium text-sm text-blue-base"
                  >
                    {elearn?.[0]?.btn_label}
                  </Link>
                </button>
                <button className="px-6 py-[10.5px] bg-white rounded-lg flex justify-center items-center gap-4">
                  <Image
                    src={backendUrl + elearn?.[0]?.btn_icon_2 || ""}
                    draggable={false}
                    alt="download"
                    width={30}
                    height={30}
                    className="w-[14px] xl:w-[18px] "
                  />
                  <Link
                    href={
                      elearn?.[0]?.btn_url_2 || ""
                    }
                    className="font-medium text-sm text-blue-base"
                  >
                    {elearn?.[0]?.btn_label_2}
                  </Link>
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center   bg-gray-base">
        <div className=" w-full gap-10 xl:gap-0 flex flex-col  items-center bg-white py-8 lg:py-14  h-full rounded-lg ">
          <div className="flex justify-center px-4 xl:px-0 flex-col items-center xl:flex-row gap-[4rem] 1xl:gap-[9.813rem] xl:items-start max-w-[290px] xs:max-w-[330px] sm:max-w-[380px] md:max-w-md-content lg:max-w-lg-content xl:max-w-xl-content 1xl:max-w-1xl-content 2xl:max-w-max-[1222px] w-full ">
            <div className="flex flex-col gap-4 mt-4">
              <Heading
                type="h5"
                className="font-semibold xl:text-xl 1xl:text-2xl text-blue-base"
              >
                {elearn?.[0]?.subtitle}
              </Heading>
              <Paragraph className="font-medium text-xs sm:text-sm 1xl:text-[18px] 1xl:leading-7">
                {elearn?.[0]?.body_desc}
              </Paragraph>
              <div className="flex flex-wrap items-center gap-[22px] my-4">
                {/* <button className="px-3 1xl:px-6 py-3 bg-white rounded-lg flex justify-center items-center gap-4 border-2 ">
                  <Image
                    src={backendUrl + elearn?.[0]?.badge?.[0]?.icon || ""}
                    alt="lock"
                    width={30}
                    height={30}
                    className="w-[18px] "
                  />
                  <span className="font-medium text-xs 1xl:text-sm text-blue-base">
                    {elearn?.[0]?.badge?.[0]?.label || ""}
                  </span>
                </button>
                <button className="px-3 1xl:px-6 py-3 bg-white rounded-lg flex justify-center items-center gap-4 border-2 ">
                  <Image
                    src={"/assets/icon/tick-square.svg"}
                    alt="tick-square"
                    width={30}
                    height={30}
                    className="w-[18px] "
                  />
                  <span className="font-medium text-xs 1xl:text-sm text-blue-base">
                    Mudah
                  </span>
                </button>
                <button className="px-3 1xl:px-6 py-3 bg-white rounded-lg flex justify-center items-center gap-4 border-2 ">
                  <Image
                    src={"/assets/icon/settings.svg"}
                    alt="settings"
                    width={30}
                    height={30}
                    className="w-[18px] "
                  />
                  <span className="font-medium text-xs 1xl:text-sm text-blue-base">
                    Fitur Banyak
                  </span>
                </button> */}
                {elearn?.[0]?.badge?.map((badge) => (
                  console.log(badge),
                  <button
                    key={badge.id}
                    className="px-3 1xl:px-6 py-3 bg-white rounded-lg flex justify-center items-center gap-4 border-2"
                  >
                    <Image
                      src={backendUrl + badge.icon }
                      alt={badge.label}
                      width={30}
                      height={30}
                      className="w-[18px]"
                    />
                    <span className="font-medium text-xs 1xl:text-sm text-blue-base">
                      {badge.label || ""}
                    </span>
                  </button>
                ))}
              </div>
              <Link
                href={elearn?.[0]?.body_url || ""}
                className="border-none w-full py-3 1xl:py-4 px-6 border-2 border-primary flex justify-between items-center  text-blue-base bg-yellow-light rounded-md"
              >
                <span className="text-xs sm:text-base">Pelajari lebih</span>
                <Image
                  src={"/assets/icon/arrow-right.svg"}
                  alt="arrow-right"
                  width={30}
                  height={30}
                  className="w-4 sm:w-[18px] "
                />
              </Link>
            </div>
            <Image
              src={backendUrl + elearn?.[0]?.body_thumbnail || ""}
              alt={elearn?.[0]?.title || "E-Learn Thumbnail"}
              draggable={false}
              width={580}
              height={580}
              className="w-[456px] 1xl:w-[565px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
