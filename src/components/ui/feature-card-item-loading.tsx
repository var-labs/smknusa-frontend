
import React from 'react'

const FeatureCardItemLoading = () => {
  return (
    <div className="relative bg-white rounded-lg 1xl:w-[23rem] h-full border overflow-hidden w-full hover:shadow-md transition-all duration-300 group animate-pulse">
      <div className="min-h-[12rem] xl:min-h-[14rem] max-h-[10rem] sm:max-h-[12rem] xl:max-h-[14rem] bg-slate-300 w-full object-cover" />

      <div className="absolute inset-0 bg-black/10 z-10" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-end z-20">
        
        <div className="inline-block px-3 py-1 mb-2 w-[8rem] h-4 rounded-md bg-gray-400" />

        <div className="h-4 bg-gray-300 rounded w-[80%] mb-2" />

        <div className="mt-auto flex justify-end gap-2">
          <div className="h-4 w-24 bg-gray-400 rounded" />
          <div className="h-4 w-4 bg-gray-400 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default FeatureCardItemLoading