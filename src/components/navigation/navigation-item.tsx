import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import Link from "next/link";
import { useMediaQuery } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";
import { useActivePage } from "@/contexts/ActivePageContext";
import { cn } from "@/utils/cn";
import NavigationItemAnimate from "./navigation-item-animate";
import { defaultTransition } from "../animation/transition";
import { NavigationDropdownMenuItem } from "./navigation-dropdown-menu-item";
import NavigationDropdown from "./navigation-dropdown-icon";
import { useNavbar } from "@/services/api/useQueries/useNavbar";

export type NavigationLinkData = {
  linkDropdownData: {
    text: string;
    description: string;
    icon: string;
    linkRef: string;
  };
};

interface NavigationItemProps {
  name: string;
  dropdown?: boolean;
  show: boolean;
  route?: string;
}

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const getDescription = (title: string): string => {
  const descriptions: { [key: string]: string } = {
    "Sambutan Kepala Sekolah": "Berisi sambutan resmi dari kepala sekolah",
    "Visi dan Misi": "Berisi Informasi Visi dan Misi SMK",
    "Struktur Organisasi Sekolah": "Berisi Tatanan Struktur Organisasi SMK",
    "Program Kerja Sekolah": "Berisi Tatanan Program Kerja SMK",
    "Komite Sekolah": "Berisi Tatanan Komite SMK",
    "Fasilitas Sekolah": "Berisi Detail Kelengkapan Fasilitas SMK",
    "Sejarah Sekolah": "Berisi Informasi Mengenai Sejarah Berdirinya SMK",
    "Data Warga Sekolah": "Berisi Data Warga SMK Negeri 1 Purwosari",
    "Ekstrakurikuler": "Berisi Data Ekstrakulikuler SMK Negeri 1 Purwosari",
    "E-Learning": "Berisi Informasi E-Learning yang di Gunakan SMK",
    "PPDB": "Berisi Link untuk Menuju ke Website PPDB",
    "Jurusan": "Berisi Data Jurusan SMK Negeri 1 Purwosari",
    "Form Perangkat Ajar": "Berisi Data Perangkat Ajar SMK Negeri 1 Purwosari",
    "Berita": "Berisi Informasi Mengenai Berita yang Ada di SMK",
    "Artikel": "Berisi Informasi Mengenai Artikel Yang Ada di SMK",
  };

  return descriptions[title] || "Deskripsi belum tersedia";
};

const generateLinkRef = (parentTitle: string, route: string): string => {
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

  return `${prefix}${route.startsWith("/") ? "" : "/"}${route.replace(/^\//, "")}`;
};

const convertNavbarJsonToDropdownData = (json: any): { [key: string]: NavigationLinkData[] } => {
  const map: { [key: string]: NavigationLinkData[] } = {};

  json.forEach((item: any) => {
    if (item.sub_navbar && Array.isArray(item.sub_navbar)) {
      const categoryKey = item.title;

      map[categoryKey] = item.sub_navbar.map((sub: any) => {
        const iconPath = `/assets/nav-dropdown-icon/${item.title.toLowerCase()}/${slugify(sub.title)}.svg`;

        return {
          linkDropdownData: {
            text: sub.title,
            description: sub.description,
            icon: iconPath,
            linkRef: generateLinkRef(item.title, sub.route),
          },
        };
      });
    }
  });

  return map;
};


const NavigationItem = ({
  name,
  dropdown,
  show,
  route,
}: NavigationItemProps) => {
  const [currentDropdown, setCurrentDropdown] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownControls = useAnimation();
  const basePathname = usePathname();
  const { navbars} = useNavbar()
  const pathname = "/" + basePathname.split("/")[1];
  const isMobile = useMediaQuery("only screen and (max-width: 1023.98px)");
  const { activePage } = useActivePage();
const dropdownData = useMemo(() => {
  return navbars ? convertNavbarJsonToDropdownData(navbars) : {};
}, [navbars]);

const currentDropdownData = useMemo(() => {
  return currentDropdown ? dropdownData[currentDropdown] ?? [] : [];
}, [dropdownData, currentDropdown]);


  const handleOpenDropdown = () => {
    dropdownControls.start("animate");
    setShowDropdown(true);
    setCurrentDropdown(name);
  };

  const handleCloseDropdown = () => {
    setCurrentDropdown(null);
    setShowDropdown(false);
  };

  return (
    <>
      <div
        className="flex justify-start cursor-pointer"
        onMouseLeave={() => handleCloseDropdown()}
      >
        <span
          onMouseEnter={() => handleOpenDropdown()}
          className={`font-semibold  relative flex justify-center items-center  gap-1   rounded-md  w-min-content
          before:border-0 before:absolute before:bottom-0 before:right-0 before:border-transparent before:transition-colors before:duration-500
          before:w-full hover:before:border-[1px] hover:before:left-0 hover:before:border-[#F5C451] cursor-pointer z-20 ${
            route === pathname
              ? "opacity-100 before:border-[1px] "
              : pathname === "/"
              ? "opacity-100"
              : "opacity-60"
          } `}
        >
          <span
            className={`hidden xl:block ${
              show || !activePage ? "text-blue-base" : "text-white"
            }`}
          >
            <Link href={route || ""}>{name}</Link>
          </span>
          {dropdown && (
            <motion.div animate={{ rotate: showDropdown ? 180 : 0 }}>
              <NavigationDropdown show={show} />
            </motion.div>
          )}
        </span>
        {route === "/e-raport" || route === "/w-bkk" ? null : (
          <AnimatePresence>
            {showDropdown && (
              <div className="absolute left-0 xs:left-4 md:left-14  xl:left-auto xl:ml-6  xl:top-auto h-[25rem] xl:h-auto xl:justify-start xl:items-start flex flex-col items-end justify-end">
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={{
                    initial: { opacity: 0.5, scale: 0.85, y: 10 },
                    animate: { opacity: 1, scale: 1, y: isMobile ? -420 : 0 },
                    exit: { opacity: 0, y: 10 },
                  }}
                  transition={defaultTransition}
                  className={cn(`min-w-[17rem] xs:min-w-[19rem] border-none max-h-[calc(80vh-4rem)] overflow-y-auto sm:min-w-[20rem] relative w-[90%] xl:w-[26rem] items-center justify-center grid grid-cols-2 xl:gap-0 h-fit xl:h-full xl:grid-cols-1 xl:mt-14 z-20 rounded-tl-[10px] xl:rounded-b-[10px] rounded-r-[10px] bg-white bg-opacity-100 shadow-lg xl:top-5 before:border-b-white xl:pb-0 pb-8 
                    before:content-[''] xl:before:block before:hidden before:absolute before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent before:border-b-[14px] before:top-[-13.6px]  before:left-2
                  scrollbar scrollbar-w-[6px] scrollbar-thumb-[#F5C451] scrollbar-track-yellow-100`)}
                >
                  {currentDropdownData?.map((data, index) => (
                    <React.Fragment key={index}>
                      <Link
                        href={data.linkDropdownData.linkRef}
                        className="w-full h-[6rem] xl:h-auto"
                      >
                        <NavigationDropdownMenuItem
                          show={show}
                          active={currentDropdown}
                          item={name}
                          transition={defaultTransition}
                        >
                          <NavigationItemAnimate itemData={data} show={show} />
                        </NavigationDropdownMenuItem>
                      </Link>
                    </React.Fragment>
                  ))}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </>
  );
};

export default NavigationItem;
