"use client";

import React from "react";
// import { Heading, List, Paragraph } from "@/components/ui/typography";
import ProfileLayout from "@/layouts/profile-layout";
import { useSchool } from "@/services/api/useQueries/useSchool";
import { Paragraph } from "@/components/ui/typography";
import DynamicSchoolContentRenderer from "@/components/ui/dynamic-content-render";

const ProfileVisionMision = () => {
  const { visiMission } = useSchool();

  return (
    <ProfileLayout
      title="Visi dan Misi Sekolah"
      subtitle="Informasi mengenai visi dan misi sekolah SMK Negeri 1 Puworsari"
      className="items-start"
      classNameWrapper="pt-[70px]"
    >
      <Paragraph>
        <DynamicSchoolContentRenderer data={visiMission ?? []}/>
      </Paragraph>
    </ProfileLayout>
  );
};

export default ProfileVisionMision;
