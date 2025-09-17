"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAlert } from "@/services/api/useQueries/useAlert";
import { useAlertBanner } from "@/contexts/AlertBannerContext";
import { defaultTransition } from "../animation/transition";
import { Paragraph } from "../ui/typography";

const HomeAlert = () => {
  const { alert, isAlertLoading } = useAlert();
  const [isAtTop, setIsAtTop] = useState(true);
  const { setVisible } = useAlertBanner();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY === 0;
      setIsAtTop(currentScrollY);
      setVisible(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setVisible]);

  return pathname === "/" ? (
    <motion.div
  initial={{ y: -80 }}
  animate={{ y: isAtTop ? 0 : -80 }}
  transition={defaultTransition}
  className="fixed top-0 z-50 w-full flex justify-center xl:mt-4 xl:bg-transparent bg-primary"
>
  <div className="bg-primary w-full xl:max-w-[98%] xl:rounded-t-lg h-full relative flex justify-center items-center md:max-w-md-content lg:max-w-lg-content">
    <div className="flex items-center w-full justify-between 2xl:max-w-[1492.8px] px-4 py-2 2xl:px-11">
      {alert && !isAlertLoading ? (
        <Link
          href={alert[0]?.alert_url || ""}
          className="flex justify-between w-full gap-3 items-center cursor-pointer"
        >
          <div className="flex justify-center gap-3 items-center shrink-0">
            <Image
              src={"/assets/icon/alert.svg"}
              width={20}
              height={20}
              alt="alert"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <Paragraph className="animate-marquee-loop !text-xs lg:!text-base !font-semibold text-white inline-block">
              {alert[0]?.alert_title}
            </Paragraph>
          </div>

          <div className="flex justify-center items-center p-1 rounded-full overflow-hidden shrink-0">
            <Image
              src={"/assets/icon/line-arrow-right-blue.svg"}
              width={20}
              height={20}
              alt="line-arrow-right-blue"
            />
          </div>
        </Link>
      ) : null}
    </div>
  </div>
</motion.div>

  ) : null;
};

export default HomeAlert;
