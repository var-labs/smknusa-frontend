import Image from "next/image";
import React from "react";
import { Facility } from "@/services/api/useQueries/useFacilities";
import { backendUrl } from "@/utils/backendUrl";
import { Major } from "@/services/api/useQueries/useMajors";
import { Heading } from "./typography";

const FeatureCardItem = ({
  featureCardData,
}: {
  featureCardData: Facility | Major;
}) => {

  const getCategoryColor = (icon: string) => {
    switch (icon) {
      case "Teknologi Informatika":
        return "bg-orange-400";
      case "Agribisnis dan Agroteknologi":
        return "bg-green-500";
      case "Teknologi dan Rekayasa":
        return "bg-blue-500";
      case "Teknologi Elektronika":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="relative bg-white rounded-lg 1xl:w-[23rem] h-full border overflow-hidden w-full hover:shadow-md transition-all duration-300 group">
      <Image
        src={
          "facility_image" in featureCardData
          ? backendUrl + featureCardData.facility_image
          : backendUrl + featureCardData.jurusan_thumbnail
        }
        alt={"feature image"}
        width={800}
        height={800}
        className="min-h-[12rem] xl:min-h-[14rem]  max-h-[10rem] sm:max-h-[12rem] xl:max-h-[14rem] object-cover"
      />
      <div className="absolute inset-0 group-hover:bg-black/10 transition duration-300 z-10" />


      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-end lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-300">
        
        <div
          className={`inline-block px-3 py-1 mb-2 rounded-lg: w-fit text-white rounded-md text-xs font-semibold transform transition duration-500 ease-in-out translate-y-0 lg:-translate-y-5 lg:group-hover:translate-y-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 ${getCategoryColor(
            featureCardData.prodi.nama_prodi
          )}`}
        >
          {featureCardData.prodi.nama_prodi}
        </div>

        <Heading
          type="h3"
          className="md:text-md text-xs !font-[550] text-white xl:text-lg xl:w-full transform transition duration-500 ease-in-out translate-y-0 lg:-translate-y-5 lg:group-hover:translate-y-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 delay-100"
        >
          {"facility_name" in featureCardData
            ? featureCardData.facility_name
            : featureCardData.jurusan_nama}
        </Heading>

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
    </div>
  );
};

export default FeatureCardItem;
