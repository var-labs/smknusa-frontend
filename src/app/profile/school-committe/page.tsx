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
      classNameWrapper="pt-[70px]"
    >
      {/* <PDFViewer
        className="mt-10"
        url={
          (schoolCommittee &&
            schoolCommittee?.[0] &&
            schoolCommittee?.[0]?.profile_data) ||
          ""
        }
      /> */}
      <DynamicSchoolContentRenderer data={schoolCommittee ?? []}/>
    </ProfileLayout>
  );
};

export default ProfileSchoolCommittee;
