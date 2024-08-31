"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter from next/navigation for app router
import LoadingSpinner from "@/components/design-system/atoms/loaders/LoadingSpinner";
import LandingLayout from "@/components/design-system/templates/layouts/LandingLayout";
import { Box } from "@mui/material";
import CardWithTitle from "@/components/design-system/molecules/cards/CardWithTitle";
import { useAuth } from "@/providers/Auth.provider";
import { routePaths } from "@/types/routes.enum";

// I have this here just to redirect to the page that i am working on
// not sure how we want to do protected routes.

export default function Home() {
  const router = useRouter();
  // auth example
  const {state: authState} = useAuth()
  const {isAuthenticated} = authState
  useEffect(() => {
    // Redirect to the login page
    if(isAuthenticated){
      router.push(routePaths.LOGIN);
    } else {
      router.push(routePaths.DOCUMENTS)
    }
  }, [router]);

  return (
    <LandingLayout>
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <CardWithTitle titleProps={{ text: "" }}>
            <LoadingSpinner
              containerStyle={{
                height: 200,
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                width: 200,
              }}
            />
          </CardWithTitle>
        </Box>
      </Box>
    </LandingLayout>
  );
}
