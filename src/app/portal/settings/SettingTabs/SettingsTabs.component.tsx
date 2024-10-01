/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
"use client";
import React from "react";
import { Box } from "@mui/material";
import BasicInfoForm from "./BasicInfoForm/BasicInfoForm.component";
import ChangePasswordForm from "./ChangePasswordForm";
import MappedTabs from "@/components/molecules/tabs/MappedTabs";

export default function SettingsTabs() {
  const tabs = [
    { label: "Basic Info", content: <BasicInfoForm /> },
    { label: "Change Password", content: <ChangePasswordForm /> },
  ];

  return (
    <Box className="w-full rounded-[20px] bg-white p-6">
      <MappedTabs tabs={tabs} />
    </Box>
  );
}
