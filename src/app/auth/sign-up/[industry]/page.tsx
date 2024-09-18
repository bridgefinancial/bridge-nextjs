"use client";

import React from "react";
import { SignUpForm } from "../SignUpForm/SignUpForm.component";
import { useRouter, useSearchParams } from "next/navigation";
import { QuestionnaireRoutes, SurveyRoutes } from "@/types/routes.enum";
import { SignUpRequest, useLoginUser } from "@/services/users.service";

// Define your enums
enum SignUpRedirectTypes {
  Q = "q",
  SURVEY = "survey",
}

const SignUpPage = ({ params }: { params: { industry: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo"); // Extract 'industry' from query params
  const { industry } = params;
  const { mutateAsync: login } = useLoginUser();

  const handleRedirectAfterSignUp = (formValues: SignUpRequest) => {
    login(
      { email: formValues.email, password: formValues.password },
      {
        onSuccess: () => {
          if (redirectTo === SignUpRedirectTypes.Q) {
            // Redirect to VALUATION route
            router.push(QuestionnaireRoutes.VALUATION);
          } else if (redirectTo === SignUpRedirectTypes.SURVEY) {
            // Redirect to SURVEY_WELCOME route
            router.push(SurveyRoutes.CHIROPRACTOR_SURVEY);
          } else if (industry) {
            // Handle redirection or logic based on 'industry' query parameter
            console.log(`Industry: ${industry}`);
            // You can add any specific logic or additional routes based on the industry
          } else {
            // Default action or redirect if needed
            console.log("Unknown redirect type or industry missing.");
          }
        },
      }
    );
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
