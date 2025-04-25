import { alpha, styled } from "@mui/material/styles";
import MuiCard, { CardProps as MuiCardProps } from "@mui/material/Card";

export interface StyledCardProps extends MuiCardProps {}

export const StyledCard = styled(MuiCard)<StyledCardProps>(({ theme }) => ({
  display: "flex",
  borderRadius: 8,
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  backgroundColor: alpha(theme.palette.background.paper, 0.3),
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));
