import { styled } from "@mui/material/styles";
import Stack, { StackProps } from "@mui/material/Stack";

export interface SignInContainerProps extends StackProps {
  "data-testid"?: string;
}

export const SignInContainer = styled(Stack)<SignInContainerProps>(
  ({ theme }) => ({
    position: "relative",
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      zIndex: -1,
      inset: 0,
      backgroundImage:
        "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
      backgroundRepeat: "no-repeat",
      ...theme.applyStyles("dark", {
        backgroundImage:
          "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
      }),
    },
  })
);

export const SignInContainerWithTestId = styled(SignInContainer)`
  data-testid: "sign-in-container";
`;
