import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import { Extra } from "@/services/api/useQueries/useExtracurricular";
import { backendUrl } from "@/utils/backendUrl";
import { Partnership } from "@/services/api/useQueries/usePartnerships";
import { Heading } from "./typography";

type ProfileCardItemProps = {
  profileCardData: Extra | Partnership;
};

const ProfileCardItem = ({ profileCardData }: ProfileCardItemProps) => {
  const parsedHtml = parse(
    "extra_name" in profileCardData
      ? profileCardData.extra_name
      : profileCardData.kemitraan_name
  );

  return (
    <div className="relative group rounded-lg sm:w-full 1xl:w-[23rem] h-full border overflow-hidden hover:shadow-md transition-all duration-300 bg-white">
      <Image
        src={
          "extra_image" in profileCardData
            ? backendUrl + profileCardData.extra_image
            : backendUrl + profileCardData.kemitraan_thumbnail
        }
        alt={
          "extra_name" in profileCardData
          ? profileCardData.extra_name
          : profileCardData.kemitraan_name
        }
        width={800}
        height={800}
        className="w-full min-h-[11rem] xl:min-h-[12rem]  max-h-[11rem] sm:max-h-[12rem] xl:max-h-[12rem] object-cover"
      />

      <div className="absolute inset-0 group-hover:bg-black/10 transition duration-300 z-10" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-end lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-300">
        
        <div
            className={`bg-white px-2 sm:px-4 xl:px-2 py-2 border xl:border-none flex items-center gap-2 rounded-md w-fit sm:rounded-[10px] transform transition duration-500 ease-in-out translate-y-0 lg:-translate-y-5 lg:group-hover:translate-y-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100`}  
        >
        <Image
          src={
            "extra_logo" in profileCardData
              ? backendUrl + profileCardData.extra_logo
              : backendUrl + profileCardData.kemitraan_logo
          }
          alt={
            "extra_name" in profileCardData
              ? profileCardData.extra_name
              : profileCardData.kemitraan_name
          }
          width={40}
          height={40}
          className="w-6 h-6 rounded-md"
        />
          <Heading
              type="h5"
              className="font-semibold text-center !text-sm sm:!text-[16px] line-clamp-1  text-blue-base"
            >
              {parsedHtml}
          </Heading>
        </div>

        <div className="mt-auto transform transition duration-500 ease-in-out translate-y-0 lg:translate-y-5 lg:group-hover:translate-y-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 delay-200">
          <div className="flex items-center justify-end gap-1 text-white font-medium text-sm hover:underline cursor-pointer">
            <span>Selengkapnya</span>
            <Image
              src={"/assets/icon/arrow-right.svg"}
              alt="arrow-right"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </div>
        </div>

      </div>
      {/* <div className=" px-3 xl:p-4 flex flex-col items-stretch justify-between    gap-4 w-full my-4 xl:my-0 ">
        <div className="flex   items-center gap-2 top-0 left-0 absolute p-2 lg:p-0 lg:relative xl:absolute xl:p-2 z-20">
          <div
            className={`bg-white px-2 sm:px-4 xl:px-2 border xl:border-none py-2 rounded-md flex justify-center sm:justify-start xl:justify-center gap-2 sm:gap-4 xl:gap-2 items-center sm:rounded-[10px]`}
          >
            <Image
              src={
                "extra_logo" in profileCardData
                  ? backendUrl + profileCardData.extra_logo
                  : backendUrl + profileCardData.kemitraan_logo
              }
              alt={
                "extra_name" in profileCardData
                  ? profileCardData.extra_name
                  : profileCardData.kemitraan_name
              }
              width={40}
              height={40}
              className="w-6 h-6 rounded-md"
            />

            <Heading
              type="h5"
              className="font-semibold text-center !text-sm sm:!text-[16px] line-clamp-1  text-blue-base"
            >
              {parsedHtml}
            </Heading>
          </div>
        </div>
        {"kemitraan_location_detail" in profileCardData ? (
          <div className="flex items-center gap-2">
            <Image
              src={"/assets/icon/location-filled.svg"}
              alt={profileCardData.kemitraan_name}
              width={14}
              height={14}
              className="w-4 h-4"
            />
            <Heading
              type="h5"
              className=" !text-xs !font-[550]   xl:!text-sm  sm:w-full  line-clamp-1 leading-6 text-blue-base"
            >
              Singosari
            </Heading>
          </div>
        ) : null}
        <Heading
          type="h5"
          className="!text-xs font-[500] xl:!text-base mb-2 sm:w-full  line-clamp-3 leading-6 text-gray"
        >
          {parsedText}
        </Heading>
      </div> */}
    </div>
  );
};

export default ProfileCardItem;
