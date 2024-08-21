"use client";

import { Inter } from "next/font/google";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme/theme"; // Ensure this is a client-side import
import "./globals.css";
import "../scss/variables.scss";
import "../scss/mixins.scss";
import "../scss/defaults.scss";
import "../scss/typography.scss";
import "../scss/open-color.scss";
import "../scss/material-theme.scss";
import MainProvider from "@/providers/Main.provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  );
}
