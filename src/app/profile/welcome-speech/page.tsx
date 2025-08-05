"use client";

import React from "react";
import Image from "next/image";
import ProfileLayout from "@/layouts/profile-layout";
import { Paragraph } from "@/components/ui/typography";
import { useSchool } from "@/services/api/useQueries/useSchool";
import DynamicSchoolContentRenderer from "@/components/ui/dynamic-content-render";

const ProfileHistory = () => {
  const { principalSpeech } = useSchool();

  return (
    <ProfileLayout
      title={principalSpeech?.[0]?.profile_name || ""}
      subtitle="Sambutan resmi dari kepala sekolah SMK Negeri 1 Purwosari"
      classNameWrapper="pt-[100px]"
    >
      <Image
        src={principalSpeech?.[0]?.profile_image || ""}
        alt="welcome-speech"
        draggable={false}
        className="w-full rounded-[10px] mt-10"
        width={800}
        height={800}
      />
      <Paragraph
        className={
          "flex flex-col items-start  gap-10 text-blue-base"
        }
      >
        <DynamicSchoolContentRenderer data={principalSpeech ?? []} />
      </Paragraph>
    </ProfileLayout>
  );
};

export default ProfileHistory;
