import { Article } from "@/services/api/useQueries/useArticles";
import { Event } from "@/services/api/useQueries/useEvents";
import { News } from "@/services/api/useQueries/useNews";
import { backendUrl } from "@/utils/backendUrl";
import Image from "next/image";
import React from "react";
import { Heading } from "./typography";

type InfoCardItemProps = {
  infoCardData: Article | News | Event;
  normalDate: string;
};

const InfoCardItem = ({ infoCardData, normalDate }: InfoCardItemProps) => {
  return (
    <div className="bg-white rounded-lg lg:w-[23rem] h-full shadow-md overflow-hidden relative">
      <Image
        className="w-full  max-h-[6rem] lg:max-h-[12rem] object-cover"
        src={backendUrl + infoCardData.thumbnail}
        alt={infoCardData.nama}
        width={800}
        height={800}
      />
      <div className=" px-3 lg:p-4 flex flex-col items-stretch   gap-4 w-full my-4 lg:my-0 ">
        <div className="grid grid-cols-2   items-center gap-2 top-0 left-0 lg:absolute lg:p-2 z-20">
          {infoCardData.level === "0" ? (
            <div className={`bg-[#FFE7AF] px-2 py-1 rounded-[10px]`}>
              <p className="font-[500] text-[10px] text-gray">penting</p>
            </div>
          ) : null}

          <div className={`bg-[#CDFFAF] px-2 py-1 rounded-[10px]`}>
            <Heading type="h5" className="font-[500] text-[10px] line-clamp-1 text-gray">
              {infoCardData.category.nama}
            </Heading>
          </div>
        </div>
        
          <Heading type="h5" className="lg:text-md text-xs font-[500] lg:min-h-16  lg:text-[18px] mb-2 lg:w-full w-[8.5rem] line-clamp-3"> {infoCardData.nama}</Heading>
     
        <div className="text-sm gap-2 text-gray flex flex-col lg:flex-row lg:justify-between lg:items-center w-full">
          <div className="flex gap-2 items-center">
            <Image
              src={"/assets/icon/user-profile.svg"}
              alt="user"
              height={15}
              width={15}
              className="w-3 h-3 invert"
            />
            <span className=" flex text-gray font-[500] text-[12px] gap-2 items-center">
              SMKNUSA
            </span>
          </div>
          <div className="flex lg:ml-auto font-[500] mr-4 text-[12px] text-gray text-right gap-2 items-center">
            <Image
              src={"/assets/icon/clock.svg"}
              alt="user"
              width={15}
              height={15}
            />
            {normalDate}
          </div>
          <span className="font-[500]  text-[12px] text-gray flex items-center gap-2">
            <Image
              src={"/assets/icon/eye.svg"}
              alt="views"
              width={15}
              height={15}
            />
            {infoCardData.viewer}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoCardItem;