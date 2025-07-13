"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";
import { useActivePage } from "@/contexts/ActivePageContext";
import { useNavbar } from "@/services/api/useQueries/useNavbar";
import NavigationItem from "./navigation-item";
import NavigationSearch from "./navigation-search";
import NavigationSearchResult from "./navigation-search-result";
import NavigationHamburger from "./navigation-hamburger";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMobile = useMediaQuery("only screen and (max-width : 1023.98px)");
  const { activePage } = useActivePage();
  const pathname = usePathname();
  const [searchToggle, setSearchToggle] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { navbars } = useNavbar();
  // const { handleActiveUnavailableToast } = useActiveToast();
  const [currentDropdown, setCurrentDropdown] = useState<string | null>(
    "Akademik"
  );

  useEffect(() => {
    const controlNavbar = () => {
      if (isMobile) {
        if (showMenu) {
          setShow(true);
        } else {
          if (window.scrollY > lastScrollY) {
            setShow(false);
          } else {
            setShow(true);
          }
        }
      } else if (window.scrollY > 0) {
        setShow(true);
      } else {
        setShow(false);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, isMobile, showMenu]);

  const handleToggleMenu = () => {
    if (currentDropdown === null) {
      setCurrentDropdown("Akademik");
    }
    setShowMenu(!showMenu);
  };


  return (
    <>
      <div
        className={`flex items-center  xl:shadow-none  shadow-md  justify-center ${showMenu ? "" : "xl:rounded-lg"
          } bg-white xl:bg-transparent  xl:px-2.5   z-40  transition-[padding,max-width,transform] ${show
            ? `  text-blue-base pt-0 xl:pt-2 `
            : `  ${activePage
              ? `-translate-y-20 xl:translate-y-0 xl:pt-8 xl:text-white  ${pathname === "/"
                ? ""
                : "xl:pt-1 xl:mt-[15px] xl:max-w-[98%]"
              } before:backdrop-blur-sm before:backdrop-hack `
              : "xl:translate-y-2 xl:pt-0 "
            }`
          } 
        ${pathname.startsWith("/print") ? "hidden" : ""}
        fixed w-full  delay-0 `}
      >
        <div
          className={`flex  items-center justify-center    md:max-w-md-content lg:max-w-lg-content xl:max-w-full   w-full py-3 transition-all rounded-[10px] px-4 2xl:px-11  ${!show && activePage
            ? "xl:bg-opacity-0  bg-white font-[800] xl:font-[900] "
            : `bg-opacity-100 bg-white font-[800] xl:shadow-md`
            }  `}
        >
          <div className="flex  items-center w-full justify-between  2xl:max-w-[1492.8px] ">
            <Link href={"/"} className="">
              <div className="flex items-center">
                <Image
                  src={"/assets/icon/logo-skansa.svg"}
                  alt=""
                  height={55}
                  width={55}
                  quality={100}
                  className="w-10 xl:w-auto h-auto"
                />

                <h2 className="ml-2 text-sm xl:text-lg  ">
                  SMK NEGERI 1 <br className="block" />
                  PURWOSARI
                </h2>
              </div>
            </Link>
            <div className="flex xl:justify-between w-auto   font-[600] ">
              <div
                className={`xl:flex hidden  justify-center items-center gap-8 ${!show && activePage ? "text-white" : " text-gray-light"
                  }`}
              >
                {!navbars || navbars.length === 0 ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-24 h-6 rounded bg-gray-300 animate-pulse"
                    />
                  ))
                ) :
                (navbars?.map((navbarItem) => {
                  const hasDropdown = !!navbarItem.sub_navbar?.length;
                  const name = typeof navbarItem.title === "string" ? navbarItem.title : "";
                  const route = typeof navbarItem.route === "string"
                    ? navbarItem.route
                    : `/${name.toLowerCase()}`;

                  return (
                    <NavigationItem
                      key={typeof navbarItem.id === "string" || typeof navbarItem.id === "number"
                        ? navbarItem.id
                        : JSON.stringify(navbarItem.id)}
                      name={name}
                      show={show}
                      dropdown={hasDropdown}
                      route={route}
                    />
                  );
                }))
                }
              </div>
            </div>
            <div className="flex items-center justify-end xl:space-x-4 gap-4 xl:gap-0 w-[195px] pr-2">
              <NavigationSearch
                show={show}
                searchToggle={searchToggle}
                setSearchToggle={setSearchToggle}
              />
                {isMobile &&
                  (!showMenu ? (
                    <Image
                      src={"/assets/icon/hamburger.svg"}
                      alt="hamburger"
                      width={25}
                      height={25}
                      className="w-6 h-6 "
                      onClick={() => handleToggleMenu()}
                    />
                  ) : (
                    <Image
                      src={"/assets/icon/close-square-blue.svg"}
                      alt="hamburger"
                      width={25}
                      height={25}
                      className="w-6 h-6 "
                      onClick={() => handleToggleMenu()}
                    />
                  ))
                }
            </div>
          </div>
        </div>
      </div>

      {isMobile && !pathname.startsWith("/print") ? (
        <>
          <NavigationHamburger
            currentDropdown={currentDropdown}
            setCurrentDropdown={setCurrentDropdown}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
        </>
      ) : null}
      <NavigationSearchResult
        searchToggle={searchToggle}
        setSearchToggle={setSearchToggle}
      />
    </>
  );
};

export default Navbar;
