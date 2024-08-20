import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme/theme"; // Ensure this is a client-side import
import { ErrorsProvider } from "./Errors.provider";
import { ReactNode } from "react";


interface MainProviderProps {
  children: ReactNode
}

const MainProvider: React.FC<MainProviderProps> = (props: MainProviderProps) => {
  const {children} = props;
  return (
    <ErrorsProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize styles and apply baseline */}
      <>
      {children}

      </>
    </ThemeProvider>
    </ErrorsProvider>
  );
};

export default MainProvider;
