import { useQuery } from "@tanstack/react-query";
import { getElearn } from "../methods/fetch-elearn";

export interface Elearn {
  id: number;
  title: string;
  thumbnail: string;
  desc: string;
  btn_label: string;
  btn_url: string;
  btn_icon: string;
  btn_label_2: string;
  btn_url_2: string;
  btn_icon_2: string;
  subtitle: string;
  body_desc: string;
  body_thumbnail: string;
  body_url: string;
  badge: {
  id: number;
  label: string;
  icon: string;
  elearning_id: number;
}[];
}

export const useElearn = () => {
  const { data: elearn, isLoading: isElearnLoading } = useQuery<
    Elearn[] | null
  >({
    queryKey: ["elearn"],
    queryFn: async () => {
      const data = await getElearn();
      return data ?? [];
    },
  });

  return { elearn, isElearnLoading};
};
