"use client";

import Link from "next/link";
import Image from "next/image";
import { useElearn } from "@/services/api/useQueries/useElearn";
import { backendUrl } from "@/utils/backendUrl";
import { Heading } from "@/components/ui/typography";

const Page = () => {
  const { elearn } = useElearn();

  return (
    <div className="xl:min-h-screen w-full flex flex-col items-center px-6 py-10 bg-gray-50">
      
      <Heading type="h2" className="text-center mb-6 mt-[65px] xl:mt-24 text-2xl font-bold text-blue-base">
        Pilih Modul E-Learn
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl w-full">
        {elearn?.map((item) => (
          <Link
            key={item.id}
            href={`/academic/e-learn/${item.id}`}
            className="p-4 border rounded-lg hover:shadow-lg bg-white transition duration-200"
          >
            <Image
              src={backendUrl + item.thumbnail}
              alt={item.title}
              width={300}
              height={180}
              className="w-full h-[180px] object-cover rounded-md"
            />
            <h3 className="mt-2 font-semibold text-blue-base">{item.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
