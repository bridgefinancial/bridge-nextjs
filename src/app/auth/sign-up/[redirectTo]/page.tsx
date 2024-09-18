"use client";

import React from "react";
import { SignUpForm } from "../SignUpForm/SignUpForm.component";
import { useRouter, useSearchParams } from "next/navigation";
import { QuestionnaireRoutes, SurveyRoutes } from "@/types/routes.enum";

// Define your enums
enum SignUpRedirectTypes {
  Q = "q",
  SURVEY = "survey",
}

const SignUpPage = ({ params }: { params: { redirectTo: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const industry = searchParams.get("industry"); // Extract 'industry' from query params
  const { redirectTo } = params;

  const handleRedirectAfterSignUp = () => {
    if (redirectTo === SignUpRedirectTypes.Q) {
      // Redirect to VALUATION route
      router.push(QuestionnaireRoutes.VALUATION);
    } else if (redirectTo === SignUpRedirectTypes.SURVEY) {
      // Redirect to SURVEY_WELCOME route
      router.push(SurveyRoutes.SURVEY_WELCOME);
    } else if (industry) {
      // Handle redirection or logic based on 'industry' query parameter
      console.log(`Industry: ${industry}`);
      // You can add any specific logic or additional routes based on the industry
    } else {
      // Default action or redirect if needed
      console.log("Unknown redirect type or industry missing.");
    }
  };

  return (
    <SignUpForm
      industryName={industry ? industry : undefined}
      handleRedirectAfterSignUp={handleRedirectAfterSignUp}
      cardContainerStyles={{
        boxShadow: 0,
        backgroundColor: "transparent",
      }}
    />
  );
};

export default SignUpPage;
