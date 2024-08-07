import React from "react";

const HomeHero = () => {
  return (
    <section className="flex justify-center items-center xl:p-0 p-2 bg-gray-base mt-[4.5rem] xl:mt-0">
      <div className="overflow-hidden xl:rounded-b-lg rounded-[10px]">
        <video
          width={1600}
          src="/video/home-hero-video.mp4"
          autoPlay
          loop
          playsInline
          muted
          className="w-screen"
        />
      </div>
    </section>
  );
};

export default HomeHero;
