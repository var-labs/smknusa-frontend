import React from "react";

const ProfileCardItemLoading = () => {
  return (
    <div className="relative bg-white rounded-lg sm:w-full 1xl:w-[23rem] h-full border overflow-hidden shadow-md animate-pulse">
      <div className="w-full min-h-[11rem] xl:min-h-[12rem] max-h-[11rem] sm:max-h-[12rem] xl:max-h-[12rem] bg-slate-300 object-cover" />

      <div className="absolute inset-0 bg-black/10 z-10" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-end z-20">
        <div className="bg-white px-2 sm:px-4 xl:px-2 py-2 border xl:border-none flex items-center gap-2 rounded-md w-fit sm:rounded-[10px] mb-2">
          <div className="w-6 h-6 bg-gray-300 rounded-md" />
          <div className="h-4 w-[6rem] bg-gray-300 rounded" />
        </div>

        <div className="mt-auto flex items-center justify-end gap-2">
          <div className="h-4 w-24 bg-gray-400 rounded" />
          <div className="h-4 w-4 bg-gray-400 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCardItemLoading;
