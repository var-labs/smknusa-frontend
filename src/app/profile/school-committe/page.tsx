"use client";

import React from "react";
import ProfileLayout from "@/layouts/profile-layout";
import { useSchool } from "@/services/api/useQueries/useSchool";
import DynamicSchoolContentRenderer from "@/components/ui/dynamic-content-render";

const ProfileSchoolCommittee = () => {
  const { schoolCommittee } = useSchool();

  return (
    <ProfileLayout
      title="Komite Sekolah"
      subtitle="Memberitahu informasi mengenai komite sekolah"
      classNameWrapper="pt-[100px]"
    >
      <DynamicSchoolContentRenderer data={schoolCommittee ?? []}/>
    </ProfileLayout>
  );
};

export default ProfileSchoolCommittee;
