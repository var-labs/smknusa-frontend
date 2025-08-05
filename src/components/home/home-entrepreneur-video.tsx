"use client";

import React from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useSchool } from "@/services/api/useQueries/useSchool";
import { Heading, Paragraph } from "../ui/typography";

// import YouTube, { YouTubeEvent } from "react-youtube";
// import { motion } from "framer-motion";
// import useJumbotron from "@/services/api/useQueries/useJumbotron";

// const HomeEntrepreneurVideo = () => {
//   const { partnersJumbotron, isPartnersJumbotronLoading } = useJumbotron();
//   const onPlayerReady = (event: YouTubeEvent<unknown>) => {
//     event.target.pauseVideo();
//   };

//   const extractVideoId = (url: string): string | null => {
//     const regex =
//       /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };

//   const opts = {
//     height: "100%",
//     width: "100%",
//     playerVars: {
//       controls: 0,
//       modestbranding: 1,
//       disablekb: 1,
//       fs: 0,
//       rel: 0,
//       showinfo: 0,
//       iv_load_policy: 3,
//       cc_load_policy: 0,
//       hl: "",
//       cc_lang_pref: "",
//     },
//   };

//   return !isPartnersJumbotronLoading ? (
//     <YouTube
//       className="rounded-[10px] overflow-hidden  min-h-52 sm:min-h-60 md:min-h-72 xl:min-h-[30rem] 1xl:min-h-[34rem] 2xl:min-h-[38rem] lg:min-h-[20rem] w-full md:max-w-md-content lg:max-w-lg-content xl:max-w-full 2xl:max-w-max-container"
//       videoId={
//         (partnersJumbotron &&
//           partnersJumbotron[0] &&
//           extractVideoId(partnersJumbotron[0].video_url || "")) ||
//         ""
//       }
//       opts={opts}
//       onReady={onPlayerReady}
//     />
//   ) : (
//     <motion.div className="h-full flex flex-col justify-center items-center bg-gray-medium rounded-lg  min-h-52 sm:min-h-60 md:min-h-72 xl:min-h-[30rem] 1xl:min-h-[34rem] 2xl:min-h-[38rem] lg:min-h-[20rem] w-full  md:max-w-md-content lg:max-w-lg-content xl:max-w-full 2xl:max-w-max-container">
//       <Image
//         src={"https://img.icons8.com/fluency-systems-filled/96/FFFFFF/play.png"}
//         alt="Play Icon"
//         width={100}
//         height={100}
//         className="animate-pulse"
//       />
//     </motion.div>
//   );
// };

// export default HomeEntrepreneurVideo;

const HomePrincipalSpeech = () => {
  const { principalSpeech } = useSchool();
  console.log(principalSpeech);

  const sanitizedHtml = principalSpeech?.[0]?.profile_data ? DOMPurify.sanitize(principalSpeech?.[0]?.profile_data, {
      FORBID_TAGS: ["img", "style", "b", "i", "strong", "em", "u", "font"],
      FORBID_ATTR: ["style"],
    }) : "";
    const parsedHtml = parse(sanitizedHtml);

  return (
    <div className="w-full flex justify-center items-start bg-white 2xl:max-w-max-container xl:rounded-[10px] overflow-hidden relative mt-10">
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-white to-transparent z-20 p-10 md:p-7 opacity-60" />
      {principalSpeech?.[0]?.profile_image && (
        <div className="hidden lg:block flex-shrink-0">
          <Image
            src={principalSpeech?.[0]?.profile_image || ""}
            alt="Foto Kepala Sekolah"
            width={500}
            height={500}
            draggable={false}
            className="w-[30em] h-auto object-contain"
          />
        </div>
      )}
      <div className="flex-1 flex-col py-8 px-4 space-y-10">
        <Heading type="h2" className="text-xl lg:text-2xl xl:text-3xl font-semibold mb-2 xl:mb-4 text-center">
          {principalSpeech?.[0]?.profile_name}
        </Heading>
        <Paragraph className="max-h-[480px] overflow-y-auto ">
          {parsedHtml}
        </Paragraph>
      </div>
    </div>
  )
}

export default HomePrincipalSpeech