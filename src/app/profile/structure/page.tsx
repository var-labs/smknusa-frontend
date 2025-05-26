"use client";

import React from "react";
import ProfileLayout from "@/layouts/profile-layout";
import { useSchool } from "@/services/api/useQueries/useSchool";
import DynamicSchoolContentRenderer from "@/components/ui/dynamic-content-render";

const ProfileStructure = () => {
  const { schoolStructure } = useSchool();

  return (
    <ProfileLayout
      title="Struktur Organisasi Sekolah"
      subtitle="Struktur Organisasi Sekolah SMK Negeri 1 Purwosari"
      classNameWrapper="pt-[70px]"
    >
      {/* <PDFViewer
        className="mt-10"
        url={
          (schoolStructure &&
            schoolStructure?.[0] &&
            schoolStructure?.[0]?.profile_data) ||
          ""
        }
      /> */}
      <DynamicSchoolContentRenderer data={schoolStructure ?? []}/>
    </ProfileLayout>
  );
};

export default ProfileStructure;
