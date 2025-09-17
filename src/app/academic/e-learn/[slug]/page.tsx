"use client";

import Image from "next/image";
import React from "react";
import { Heading, Paragraph } from "@/components/ui/typography";
import { cn } from "@/utils/cn";
import { useElearn } from "@/services/api/useQueries/useElearn";
import { backendUrl } from "@/utils/backendUrl";
import { slugify } from "@/utils/slugify";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { elearn, isElearnLoading } = useElearn();

  const elearnData = elearn?.find((item) => slugify(item.title) === slug);

  if (isElearnLoading) return <div className="mt-[65px] xl:mt-24">Loading...</div>;
  if (!elearnData) return <div>Data tidak ditemukan</div>;

  const imageUrl = elearnData.thumbnail ? `${backendUrl}${elearnData.thumbnail}` : "";

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
                {elearnData?.title}
              </Heading>
              <Heading
                type="h5"
                className="text-center font-medium text-xs lg:text-base xl:text-[18px] md:w-[28rem] lg:w-[38rem] xl:w-[708px]"
              >
               {elearnData?.desc}
              </Heading>
              <div className="flex justify-center gap-3 xl:gap-6 items-center">
                  {[1, 2].map((n) => {
                    type BtnKey = "btn_url" | "btn_url_2" | "btn_icon" | "btn_icon_2" | "btn_label" | "btn_label_2";
                    const urlKey: BtnKey = n === 1 ? "btn_url" : "btn_url_2";
                    const iconKey: BtnKey = n === 1 ? "btn_icon" : "btn_icon_2";
                    const labelKey: BtnKey = n === 1 ? "btn_label" : "btn_label_2";
                    const url = elearnData?.[urlKey];
                    const icon = elearnData?.[iconKey];
                    const label = elearnData?.[labelKey];

                    return (
                      <a
                        key={n}
                        href={url?.startsWith("http") ? url : `https://${url}`}
                        className="min-w-[170px] px-6 py-2 bg-white rounded-lg flex justify-center items-center gap-3 font-medium text-sm text-blue-base text-center"
                        style={{ textDecoration: "none" }}
                      >
                        <Image
                          src={backendUrl + icon}
                          alt={label || "button-icon"}
                          width={24}
                          height={24}
                          className="w-[20px] h-[20px] object-contain"
                          draggable={false}
                        />
                        {label}
                      </a>
                    );
                  })}
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
                {elearnData?.subtitle}
              </Heading>
              <Paragraph className="font-medium text-xs sm:text-sm 1xl:text-[18px] 1xl:leading-7">
                {elearnData?.body_desc}
              </Paragraph>
              <div className="flex flex-wrap items-center gap-[22px] my-4">
                {elearnData?.badge?.map((badge) => (
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
              <a
                href={elearnData?.body_url.startsWith("http") ? elearnData?.body_url : `https://${elearnData?.body_url}` || ""}
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
              </a>
            </div>
            <Image
              src={backendUrl + elearnData?.body_thumbnail || ""}
              alt={elearnData?.title || "E-Learn Thumbnail"}
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
