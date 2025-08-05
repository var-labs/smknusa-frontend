import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { defaultTransition } from "../animation/transition";

interface NavigationSearchProps {
  show: boolean;
  searchToggle: boolean;
  setSearchToggle: Dispatch<SetStateAction<boolean>>;
}

const NavigationSearch = ({
  show,
  searchToggle,
  setSearchToggle,
}: NavigationSearchProps) => {


  console.log(show);

  return (
    <>
      <motion.div
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
        transition={defaultTransition}
        onClick={() => setSearchToggle(!searchToggle)}
      >
        <Image
          src={"/assets/icon/search.svg"}
          alt="search"
          className={`invert transition-all w-4 h-4 `}
          width={22}
          height={22}
        />
      </motion.div>
    </>
  );
};

export default NavigationSearch;
