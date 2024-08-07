import { Heading } from '@/components/ui/typography'
import React from 'react'

const FacilityFilter = () => {
  return (
    <div className="flex xl:justify-between xl:flex-row flex-col items-center w-full px-6 mb-10 xl:mb-0 1xl:px-14 place-self-center max-w-[1264px] ">
      
      <Heading type='h5' className='xl:w-1/3  my-10'>Kami memiliiki beberapa fasilitas yang dapat menunjang kebutuhan siswa.</Heading>
      <select className='xl:w-1/3 w-full flex px-4 py-2 border-2 rounded-[10px]  text-base text-gray-900  border-gray-300  bg-gray-50 focus:ring-gray-400 focus:border-gray-400 '>
        <option value="all">Semua Jurusan</option>
        <option value="all">Semua Jurusan</option>
        <option value="all">Semua Jurusan</option>
      </select>
    </div>
  )
}

export default FacilityFilter