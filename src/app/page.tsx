import React from "react";
import LoginPage from "./auth/login/page";
import ToastNotification from "@/components/design-system/molecules/feedback/ToastNotification";
import LoadingSpinner from "@/components/design-system/atoms/loaders/LoadingSpinner";
import LandingLayout from "@/components/design-system/templates/layouts/LandingLayout";
import { Box, Container } from "@mui/material";
import CardWithTitle from "@/components/design-system/molecules/cards/CardWithTitle";

export default function Home() {
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
