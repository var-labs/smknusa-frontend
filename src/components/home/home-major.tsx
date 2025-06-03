"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Major, useMajors } from "@/services/api/useQueries/useMajors";
import HomeMajorSlider from "./home-major-slider";
import { Heading, Paragraph } from "../ui/typography";
import { defaultTransition } from "../animation/transition";
import { useTooltipOnTruncate } from "../ui/tooltip-hover";

//ganti sesuai API prodi_Short
// const majorLinkData = [
//   {
//     text: "Informatika",
//     slide: "TI",
//   },
//   {
//     text: "Agribisnis",
//     slide: "Pertanian",
//   },
//   {
//     text: "Pemesinan",
//     slide: "Pemesinan",
//   },
// ];

const HomeMajor = () => {
  const [currentSlide, setCurrentSlide] = useState("TI");
  const navHighlight = useAnimation();
  const { majors } = useMajors();
  const { handleMouseEnter, handleMouseLeave, TooltipComponent } = useTooltipOnTruncate();
  const majorData = majors?.filter(
    (major: Major) => major.prodi.prodi_short === currentSlide 
  );
  const isMobile = useMediaQuery("only screen and (max-width : 1023.98px)");
  const controls = useAnimation();

  const majorLinkData = React.useMemo(() => {
    if (!majors || majors.length === 0) return [];
    
    const uniqueProdiShorts = Array.from(
      new Set(majors.map((major: Major) => major.prodi.prodi_short))
    );
    
    return uniqueProdiShorts.map(prodiShort => ({
      text: prodiShort,
      slide: prodiShort,
    }));
  }, [majors]);

  // Ref untuk mengakses elemen nav
  const navItemRefs = useRef<(HTMLElement | null)[]>([]);
  const navContainerRef = useRef<HTMLDivElement>(null);
  
  // Function untuk menghitung posisi dan lebar secara real-time
  const calculateNavHighlight = useCallback((targetSlide: string) => {
  const targetIndex = majorLinkData.findIndex(item => item.slide === targetSlide);
  
  if (targetIndex === -1 || !navItemRefs.current[targetIndex] || !navContainerRef.current) {
    // Fallback dinamis berdasarkan jumlah item
    const fallbackWidth = majorLinkData.length > 0 ? `${100 / majorLinkData.length}%` : "25%";
    return { x: 0, width: fallbackWidth };
  }

  const targetElement = navItemRefs.current[targetIndex];
  const containerElement = navContainerRef.current;
  
  if (!targetElement || !containerElement) {
    const fallbackWidth = majorLinkData.length > 0 ? `${100 / majorLinkData.length}%` : "25%";
    return { x: 0, width: fallbackWidth };
  }

  const targetRect = targetElement.getBoundingClientRect();
  const containerRect = containerElement.getBoundingClientRect();
  
  const containerStyles = window.getComputedStyle(containerElement);
  const containerPaddingLeft = parseInt(containerStyles.paddingLeft) || 0;
  
  const baseX = targetRect.left - containerRect.left - containerPaddingLeft;
  const centeringOffset = 8; 
  const x = baseX + centeringOffset;
  const width = targetRect.width;

  return { 
    x: Math.max(0, x),
    width: `${width}px` 
  };
}, [majorLinkData]);


useEffect(() => {
  const observeResize = () => {
    if (navContainerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        // kalkulasi posisi ketika container berubah
        if (currentSlide) {
          const position = calculateNavHighlight(currentSlide);
          navHighlight.set(position);
        }
      });
      
      resizeObserver.observe(navContainerRef.current);
      return () => resizeObserver.disconnect();
    }
  };

  const cleanup = observeResize();
  return cleanup;
}, [currentSlide, majorLinkData, calculateNavHighlight, navHighlight]);

useEffect(() => {
  if (majorLinkData.length > 0 && currentSlide) {
    // Delay untuk memastikan DOM sudah ter-render
    setTimeout(() => {
      const position = calculateNavHighlight(currentSlide);
      navHighlight.set(position);
    }, 100);
  }
}, [majorLinkData, currentSlide, calculateNavHighlight, navHighlight]);

const handleSlideChange = useCallback(
  (newSlide: string) => {
    if (currentSlide !== newSlide) {
      controls.start("animate");
      
      setTimeout(() => {
        setCurrentSlide(newSlide);
        const position = calculateNavHighlight(newSlide);
        navHighlight.start(position);
        
      }, 500);
    }
  },
  [currentSlide, controls, navHighlight, calculateNavHighlight]
);

const getNavGridClass = useCallback(() => {
  const itemCount = majorLinkData.length;
  
  // Max 8
  switch (itemCount) {
    case 1: return "grid-cols-1";
    case 2: return "grid-cols-2";
    case 3: return "grid-cols-3";
    case 4: return "grid-cols-4";
    case 5: return "grid-cols-5";
    case 6: return "grid-cols-6";
    default: return `grid-cols-${Math.min(itemCount, 8)}`;
  }
}, [majorLinkData.length]);

const getContainerMaxWidth = useCallback(() => {
  const itemCount = majorLinkData.length;
  
  if (itemCount <= 2) return "max-w-sm"; // ~24rem
  if (itemCount <= 3) return "max-w-md"; // ~28rem  
  if (itemCount <= 4) return "max-w-[26rem]"; // original
  if (itemCount <= 5) return "max-w-2xl"; // ~42rem
  return "max-w-4xl"; // ~56rem
}, [majorLinkData.length]);

  return (
    <section className="w-full h-full bg-white rounded-[10px]">
      <div className="flex flex-col lg:text-center w-full items-center justify-center bg-primary  text-white pt-6 sm:pt-10 pb-16 xl:pb-48">
        <Heading
          type="h1"
          className="xl:text-[36px]  text-[22px] lg:text-[30px] sm:text-[24px] w-full px-4 md:px-0 md:max-w-md-content lg:max-w-lg-content xl:max-w-xl-content 1xl:max-w-1xl-content 2xl:max-w-max-container xl:w-fit "
        >
          Menuju SMK Bisa,
          <br className="block sm:hidden" /> SMK Hebat
        </Heading>

        <Paragraph className=" text-sm xl:text-lg lg:text-[14px] xl:w-fit  mt-[12px] w-full px-4 md:px-0 md:max-w-md-content lg:max-w-lg-content xl:max-w-xl-content 1xl:max-w-1xl-content 2xl:max-w-max-container">
          SMK Negeri 1 Purwosari memiliki beberapa program keahlian yang dibagi
          menjadi 10 macam jurusan.
        </Paragraph>

        <hr className="bg-white  xl:block hidden mt-8 xl:mt-[52px]  w-full px-4 md:px-0 md:max-w-md-content lg:max-w-lg-content xl:max-w-xl-content 1xl:max-w-1xl-content 2xl:max-w-max-container" />
      </div>

      <div className="relative  xl:px-8 px-0  xl:-mt-32 flex justify-center w-full ">
        <div className="flex justify-center items-end relative  bg-white overflow-hidden rounded-[10px]  2xl:max-w-max-container h-full w-full">
          <div className="hidden sm:absolute left-0 h-full bg-gradient-to-r from-white to-transparent z-20 p-10 md:p-16 opacity-40"></div>
          <div className="hidden sm:absolute right-0 h-full bg-gradient-to-l from-white to-transparent z-20 p-10 md:p-16 opacity-40"></div>
          <div className="relative w-full  flex flex-col xl:flex-row   justify-center gap-14  h-full  mt-8 mb-10 xl:mb-0 max-w-max-container">
            <div ref={navContainerRef} 
              className={`w-full flex top-0 -mt-28 xl:mt-0 absolute justify-center py-3 xl:rounded-[10px] items-center xl:px-4 px-6 gap-2 xl:bg-[#e5e7eb] lg:min-w-lg ${getContainerMaxWidth()}`}>
              <motion.div
                initial={false}
                animate={navHighlight}
                transition={defaultTransition}
                className="left-1 w-[9rem] h-[2.475rem] bg-white absolute rounded-md"
              />
              <div className={`grid ${getNavGridClass()} gap-1 w-full relative z-20`}>
              {majorLinkData?.map((data, index) => {
                return (
                  <>
                    <motion.span
                      key={`${data.slide}-${index}`}
                      ref={el => {navItemRefs.current[index] = el}}
                      animate={{ scale: currentSlide === data.slide ? 1 : 1 }}
                      onClick={() => handleSlideChange(data.slide)}
                      onMouseEnter={(e) => handleMouseEnter(e, data.text)}
                      onMouseLeave={handleMouseLeave}
                      className={`font-[600] text-center p-2 px-3 transition-colors duration-300 rounded-md text-xs cursor-pointer xl:text-[14px] whitespace-nowrap overflow-hidden text-ellipsis
                        ${
                          currentSlide === data.slide
                            ? "text-blue-base"
                            : "text-gray-light hover:text-blue-base"
                        }`}
                    >
                      {data.text}
                    </motion.span>

                    <TooltipComponent />
                  </>
                );
              })}
            </div>
            </div>
            <div className="relative flex justify-center items-center w-full   xl:py-16">
              <motion.div
                animate={controls}
                className="xl:mt-10 w-full"
                variants={{
                  animate: {
                    x: [0, 1400, 0],
                    opacity: [1, 0, 1],
                    transition: {
                      duration: 1.2,
                      ease: "easeInOut",
                    },
                  },
                  initial: {
                    x: 0,
                  },
                }}
              >
                <HomeMajorSlider majorData={isMobile ? majors : majorData } />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeMajor;
