"use client"

import Image from "next/image";
import React from "react";
import { Paragraph } from "@/components/ui/typography";
import ProfileLayout from "@/layouts/profile-layout";
import { useSchool } from "@/services/api/useQueries/useSchool";
import DynamicSchoolContentRenderer from "@/components/ui/dynamic-content-render";

const ProfileHistory = () => {
  const { schoolHistory } = useSchool();

  return (
    <ProfileLayout
      title="Sejarah Berdirinya Sekolah"
      subtitle="Sedikit pengetahuan mengenai bagaimana sejarah berdirinya SMK Negeri
            1 Purwosari"
      className="my-10"
      classNameWrapper="pt-[70px]"
    >
      <Image 
        src={schoolHistory?.[0]?.profile_image || ""}
        alt={schoolHistory?.[0]?.profile_name || ""}
        draggable={false}
        className="w-full rounded-[10px]"
        width={800}
        height={800}
      />
      <Paragraph className="flex flex-col items-start gap-10 text-blue-base">
        <DynamicSchoolContentRenderer data={schoolHistory ?? []}/>
      </Paragraph>
    </ProfileLayout>
  );
};

export default ProfileHistory;
