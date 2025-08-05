import Image from "next/image";

import React from "react";

type NavigationDropdownProps = {
  show: boolean;
};

const NavigationDropdownIcon = ({ show }: NavigationDropdownProps) => {

  console.log(show)

  return (
    <Image
      src={`/assets/icon/dropdown.svg`}
      alt="dropdown"
      height={20}
      width={20}
      className="w-5 h-5 xl:invert-0"
    />
  );
};

export default NavigationDropdownIcon;
