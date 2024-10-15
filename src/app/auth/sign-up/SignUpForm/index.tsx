import { Box, Container } from "@mui/material";

import {
  SignUpForm as SignUpComponent,
  SignUpFormProps,
} from "./SignUpForm.component";

const SignUpForm: React.FC<SignUpFormProps> = (
  props: SignUpFormProps,
): React.ReactNode => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10,
      }}
    >
      <Container maxWidth="sm">
        <Box>
          <SignUpComponent {...props} />
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpForm;
