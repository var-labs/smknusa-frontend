"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useNews } from "@/services/api/useQueries/useNews";
import { Paragraph } from "@/components/ui/typography";
import InfoCardItemLoading from "@/components/ui/info-card-item-loading";
import Pagination from "../../ui/pagination";
import InfoCardItem from "../../ui/info-card-item";

const NewsCard = ({
  newsFilter,
}: {
  newsFilter: {
    search: string;
    category: string;
    start_date: string;
    end_date: string;
  };
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { news, isNewsLoading } = useNews(undefined, currentPage, newsFilter);
  const postsPerPage = news?.pagination?.per_page || 9;
  const currentNewsData = news?.data;
  const queryClient = useQueryClient();

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    queryClient.invalidateQueries({ queryKey: ['news'] });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-white -mt-10 xl:-mt-14  rounded-lg ">
        {isNewsLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 1xl:grid-cols-3 gap-4 xl:gap-8 lg:px-4 py-4 1xl:px-12 pb-12 bg-white w-full 2xl:max-w-fit  rounded-[10px]">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <React.Fragment key={index}>
                  <InfoCardItemLoading />
                </React.Fragment>
              ))}
          </div>
        ) : news.data && news?.data?.length > 0 ? (
          <div className="flex justify-center items-center flex-col w-full 2xl:w-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 1xl:grid-cols-3 gap-4 xl:gap-8 lg:px-4 py-4  1xl:px-12 pb-12 bg-white rounded-[10px] w-full">
              {currentNewsData?.map((news, index) => {
                const date = new Date(news.created_at);
                const normalDate = date.toLocaleDateString();

                return (
                  <React.Fragment key={index}>
                    <Link
                      href={`/info/news/${news.id_pemberitahuan}`}
                      className="flex justify-center"
                    >
                      <InfoCardItem
                        infoCardData={news}
                        normalDate={normalDate}
                      />
                    </Link>
                  </React.Fragment>
                );
              })}
            </div>
            {news && news?.pagination && (
              <div className="mt-4 mb-12">
                <Pagination
                  totalPosts={news?.pagination.total}
                  postsPerPage={postsPerPage}
                  onPageChange={onPageChange}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[40vh] xl:mt-10 xl:mb-20 gap-[30px] w-[90%] text-center ">
            <Image
              src={"/assets/icon/404.svg"}
              alt="404"
              width={500}
              height={500}
              className="w-[12rem] lg:w-[18rem] xl:w-[24rem] "
            />
            <Paragraph className="!text-sm lg:!text-base xl:!text-lg">
              Tidak ditemukan data yang cocok.
            </Paragraph>
          </div>
        )}
      </div>
    </>
  );
};

export default NewsCard;
