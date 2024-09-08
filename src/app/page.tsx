"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter from next/navigation for app router
import LoadingSpinner from "@/components/atoms/loaders/LoadingSpinner";
import LandingLayout from "@/components/templates/layouts/LandingLayout";
import { Box } from "@mui/material";
import CardWithTitle from "@/components/molecules/cards/CardWithTitle";
import { useAuth } from "@/providers/Auth.provider";
import { routePaths } from "@/types/routes.enum";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect(routePaths.DASHBOARD);
  // const router = useRouter();
  // // auth example
  // const {state: authState} = useAuth()
  // const {isAuthenticated} = authState

  // return (
  //   <LandingLayout>
  //     <Box
  //       sx={{
  //         height: "90vh",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <Box>
  //         <CardWithTitle titleProps={{ text: "" }}>
  //           <LoadingSpinner
  //             containerStyle={{
  //               height: 200,
  //               display: "flex",
  //               alignContent: "center",
  //               justifyContent: "center",
  //               width: 200,
  //             }}
  //           />
  //         </CardWithTitle>
  //       </Box>
  //     </Box>
  //   </LandingLayout>
  // );
}
