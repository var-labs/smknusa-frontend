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
      classNameWrapper="pt-[100px]"
    >
      <DynamicSchoolContentRenderer data={schoolStructure ?? []}/>
    </ProfileLayout>
  );
};

export default ProfileStructure;
