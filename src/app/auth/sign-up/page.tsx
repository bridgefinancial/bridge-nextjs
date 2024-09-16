"use client"
import React from "react";
import SignUpForm from "./SignUpForm";
import { useRouter } from "next/navigation";
import { QuestionnaireRoutes } from "@/types/routes.enum";

const SignUpPage = () => {
    const router = useRouter()
    return (<SignUpForm
        handleRedirectAfterSignUp={() => router.push(QuestionnaireRoutes.VALUATION)}
        cardContainerStyles={{ 
    boxShadow: 0,
    backgroundColor: 'transparent'
   }} />)
};

export default SignUpPage;
