import { useQuery } from "@tanstack/react-query";
import { getNews, getNewsDetails } from "../methods/fetch-news";

export type News = {
  id_pemberitahuan: string;
  nama: string;
  icon_type: string;
  thumbnail: string;
  created_at: string;
  text: string;
  level: number;
  published_by: {
    name: string;
    img: string;
  };
  jurnal_by: string;
  location: string;
  category: {
    id: number;
    nama: string;
    color: string;
  };
  viewer: string;
};

export const useNews = (
  id?: string,
  page?: number,
  filter?: {
    search: string;
    category: string;
    start_date: string;
    end_date: string;
  }
) => {
  const {
    data: news,
    isLoading: isNewsLoading,
    refetch,
  } = useQuery<News[] | null>({
    queryKey: ["News", filter],
    queryFn: () => getNews(filter, page),
  });

  const { data: newsDetails, isLoading: isNewsDetailsLoading } =
    useQuery<News | null>({
      queryKey: ["NewsDetails"],
      queryFn: () => getNewsDetails(id),
      enabled: !!id,
    });

  return { news, newsDetails, isNewsDetailsLoading, isNewsLoading, refetch };
};
