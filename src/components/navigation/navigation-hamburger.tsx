/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { backendUrl } from "@/utils/backendUrl";
import { useNavbar } from "@/services/api/useQueries/useNavbar";
import { Heading, Paragraph } from "../ui/typography";
import { defaultTransition } from "../animation/transition";

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const generateLinkRef = (parentTitle: string, route: string): string => {
  if (!route) return "";
  if (route.startsWith("http")) return route;
  let prefix = "";
  switch (parentTitle.toLowerCase()) {
    case "profile":
      prefix = "/profile";
      break;
    case "akademik":
      prefix = "/academic";
      break;
    case "info":
      prefix = "/info";
      break;
    default:
      prefix = "/";
      break;
  }
  return `${prefix}${route.startsWith("/") ? "/" : ""}${route.replace(/^\//, "")}`;
};

const NavigationHamburger = ({
  showMenu,
  setShowMenu,
  currentDropdown,
  setCurrentDropdown,
}: {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  currentDropdown: string | null;
  setCurrentDropdown: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { navbars } = useNavbar();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  return (
    <motion.div
      initial={{ y: -1400 }}
      animate={{ y: showMenu ? 0 : -1400 }}
      transition={{ ...defaultTransition, type: "tween" }}
      className={` fixed  left-0 w-full  min-h-screen bg-white top-[64px] z-30 flex flex-col items-center gap-4 ${showMenu ? "pointer-events-auto" : "pointer-events-none"
        }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 px-6 mt-6 md:max-w-md-content lg:max-w-lg-content xl:max-w-xl-content 1xl:max-w-1xl-content 2xl:max-w-max-[1222px] w-full">
        {navbars?.map((navbarItem: any) => {
          const hasDropdown =
            Array.isArray(navbarItem.sub_navbar) &&
            navbarItem.sub_navbar.length > 0;
          const name = typeof navbarItem.title === "string" ? navbarItem.title : "";
          const route = typeof navbarItem.route === "string" ? navbarItem.route : "";

          if (hasDropdown) {
            return (
              <motion.div
                key={name}
                initial={false}
                animate={{
                  height:
                    openDropdown === name
                      ? name === "Profile"
                        ? "21rem"
                        : name === "Info"
                          ? "10.2rem"
                          : "18rem"
                      : "4rem",
                }}
                transition={defaultTransition}
                className="flex flex-col gap-4 my-3 relative overflow-hidden"
              >
                <div
                  className="flex justify-between items-center bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenDropdown(openDropdown === name ? null : name);
                  }}
                >
                  <div className="flex justify-between items-center w-full">
                    <Heading type="h5" className="text-primary font-semibold">
                      {name}
                    </Heading>
                    <Image
                      src={`/assets/icon/dropdown.svg`}
                      alt="dropdown"
                      height={20}
                      width={20}
                      className={`w-5 h-5 xl:invert-0 transition-transform ${name === openDropdown ? "-rotate-180" : "rotate-0"
                        }`}
                    />
                  </div>
                </div>
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    opacity: openDropdown === name ? 1 : 0,
                    y: openDropdown === name ? 0 : 0,
                  }}
                  transition={{ ...defaultTransition }}
                  className="flex flex-col gap-4 absolute top-16"
                >
                  {navbarItem.sub_navbar.map((sub: any, index: number) => {
                    return (
                      <Link
                        href={generateLinkRef(name, sub.route)}
                        key={index}
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-2"
                      >
                        <Image
                          src={backendUrl + sub.icon}
                          alt={sub.title}
                          width={24}
                          height={24}
                          className="w-5 h-5"
                        />
                        <div className="flex flex-col">
                          <Paragraph
                            className={`font-medium text-base ${pathname === generateLinkRef(name, sub.route)
                                ? "text-primary"
                                : "text-gray-light"
                              }`}
                          >
                            {sub.title}
                          </Paragraph>
                          <span className="text-xs text-gray-400">
                            {sub.description ?? sub.description}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
                <hr
                  className={`border  ${openDropdown === name ? "border-[#F5C451]" : "border-[#E2E8F0]"
                    } my-2`}
                />
              </motion.div>
            );
          } else if (route) {
            return (
              <div
                key={name}
                className="flex flex-col gap-4 my-3 relative overflow-hidden h-[4rem]"
              >
                <div className="flex justify-between items-center bg-white">
                  <Link
                    href={route}
                    className="flex justify-between items-center w-full"
                    onClick={() => setShowMenu(false)}
                  >
                    <Heading type="h5" className="text-primary font-semibold">
                      {name}
                    </Heading>
                  </Link>
                </div>
                <hr className="border-[#E2E8F0] border" />
              </div>
            );
          } else {
            return (
              <div
                key={name}
                className="flex flex-col gap-4 my-3 relative overflow-hidden h-[4rem] opacity-50 cursor-not-allowed"
              >
                <div className="flex justify-between items-center bg-white">
                  <span className="flex justify-between items-center w-full">
                    <Heading type="h5" className="text-primary font-semibold">
                      {name}
                    </Heading>
                  </span>
                </div>
                <hr className="border-[#E2E8F0] border" />
              </div>
            );
          }
        })}

      </div>
    </motion.div>
  );
};

export default NavigationHamburger;