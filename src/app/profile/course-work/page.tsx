"use client";

import React from "react";
import ProfileLayout from "@/layouts/profile-layout";
import { useSchool } from "@/services/api/useQueries/useSchool";
import DynamicSchoolContentRenderer from "@/components/ui/dynamic-content-render";

const ProfileCourseWork = () => {
  const { courseWork } = useSchool();

  return (
    <ProfileLayout
      title="Program Kerja Sekolah"
      subtitle="Program Kerja Sekolah SMK Negeri 1 Purwosari"
      classNameWrapper="pt-[100px]"
    >
     <DynamicSchoolContentRenderer data={courseWork ?? []}/>
    </ProfileLayout>
  );
};

export default ProfileCourseWork;
