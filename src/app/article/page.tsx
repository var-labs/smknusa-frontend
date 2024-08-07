import ArticleCard from "@/components/article/article-card";
import ArticleForm from "@/components/article/article-form";
import InfoLayout from "@/layouts/info-layout";
import { ClientOnly } from "@/utils/isClient";

export default function Article() {
  return (
    <ClientOnly>
      <InfoLayout
        title="Artikel-Artikel SMK"
        subtitle="Update artikel terbaru karya siswa-siswi SMK Negeri 1 Purwosari"
      >
        <div className=" w-full max-w-full md:max-w-md-content lg:max-w-lg-content xl:max-w-xl-content 1xl:max-w-full bg-white">
          <ArticleForm />
          <ArticleCard />
        </div>
      </InfoLayout>
    </ClientOnly>
  );
}
