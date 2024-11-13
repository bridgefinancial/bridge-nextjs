"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import the useRouter from next/navigation for app router
import LoadingSpinner from "@/components/atoms/loaders/LoadingSpinner";
import LandingLayout from "@/components/templates/layouts/LandingLayout";
import { routePaths } from "@/types/routes.enum";
import { useSessionUser } from "@/services/users.service";
import CardWithTitle from "@/components/molecules/cards/CardWithTitle";

export default function Home() {
  const { data: user, isLoading } = useSessionUser();
  const router = useRouter();

  if (user) {
    if (user.company.has_finished_onboarding) {
      router.push(routePaths.DASHBOARD);
    } else if (user.company.valuation) {
      router.push(routePaths.RECOMMENDATION);
    } else {
      router.push(routePaths.JOURNEY);
    }
  } else if (!isLoading) {
    router.push(routePaths.LOGIN);
  }

  return (
    <LandingLayout>
      <CardWithTitle titleProps={{ text: "" }}>
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </CardWithTitle>
    </LandingLayout>
  );

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
