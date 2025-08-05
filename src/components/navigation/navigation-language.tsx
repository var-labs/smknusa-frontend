import Image from "next/image";
import React from "react";
// import { AnimatePresence, motion } from "framer-motion";
import { useActiveToast } from "@/contexts/ActiveToastContext";
import NavigationDropdownIcon from "./navigation-dropdown-icon";

type NavigationLanguageProps = {
  show: boolean;
};

const NavigationLanguage = ({ show }: NavigationLanguageProps) => {
  const { handleActiveUnavailableToast } = useActiveToast();

  return (
    <div
      className="hidden xl:flex  flex-col items-center cursor-pointer"
      onClick={() => handleActiveUnavailableToast()}
    >
      <div className="flex justify-center items-center gap-1">
        <Image
          src={"/assets/icon/indonesia.svg"}
          alt="search"
          width={22}
          height={22}
        />
        <NavigationDropdownIcon show={show} />
      </div>
    </div>
  );
};

export default NavigationLanguage;
