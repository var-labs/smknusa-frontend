import { useQuery } from "@tanstack/react-query";
import {
  getAnnouncementById,
  getAnnouncements,
  getAnnouncementCategories
} from "../methods/fetch-announcements";

export type Announcement = {
  id_pemberitahuan: string;
  title: string;
  thumbnail: string;
  created_at: string;
  date: string;
  text: string;
  level: string;
  category: {
    id: number;
    nama: string;
  };
  viewer: string;
};

export const useAnnouncements = (id?: string) => {


  const { data: announcements } = useQuery<Announcement[] | null>({
    queryKey: ["Announcements"],
    queryFn: () => getAnnouncements()
  });

  const { data: announcementsById } = useQuery({
    queryKey: ["AnnouncementById"],
    queryFn: () => {
      return getAnnouncementById(id);
    },
  });

  const { data: announcementCategories } = useQuery({
    queryKey: ["AnnouncementCategories"],
    queryFn: () => {
      return getAnnouncementCategories();
    },
  });

  return { announcements, announcementsById, announcementCategories };
};