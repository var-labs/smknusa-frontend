"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";
import { useActivePage } from "@/contexts/ActivePageContext";
import { useActiveToast } from "@/contexts/ActiveToastContext";
import NavigationItem from "./navigation-item";
import NavigationLanguage from "./navigation-language";
import NavigationSearch from "./navigation-search";
import NavigationSearchResult from "./navigation-search-result";
import NavigationHamburger from "./navigation-hamburger";
import { useNavbar } from "@/services/api/useQueries/useNavbar";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMobile = useMediaQuery("only screen and (max-width : 1023.98px)");
  const { activePage } = useActivePage();
  const pathname = usePathname();
  const [searchToggle, setSearchToggle] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { navbars, isNavbarsLoading } = useNavbar();
  const { handleActiveUnavailableToast } = useActiveToast();
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
        className={`flex items-center xl:shadow-none shadow-md xl:mt-[15px] justify-center ${showMenu ? "" : "xl:rounded-lg"
          } bg-white z-40 text-blue-base  xl:max-w-[98%] 
        ${pathname.startsWith("/print") ? "hidden" : ""}
        fixed w-full delay-0`}
      >
        <div
          className={`flex items-center justify-center md:max-w-md-content lg:max-w-lg-content xl:max-w-full w-full py-3 rounded-[10px] px-4 2xl:px-11 bg-opacity-100 bg-white font-[800]`}
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
            <div className="flex xl:justify-center gap-7 items-center w-auto   font-[600] ">
              <NavigationSearch
                show={show}
                searchToggle={searchToggle}
                setSearchToggle={setSearchToggle}
              />
              <div
                className={`xl:flex hidden justify-center items-center gap-8 text-gray-light`}
              >
                {navbars?.map((navbarItem) => {
                  const hasDropdown = !!navbarItem.sub_navbar?.length;
                  const name = typeof navbarItem.title === "string" ? navbarItem.title : "";
                  const route = typeof navbarItem.route === "string"
                    ? navbarItem.route
                    : null;

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
                })}
              </div>
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
