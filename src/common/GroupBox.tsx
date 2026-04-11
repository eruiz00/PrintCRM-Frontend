import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface GroupBoxProps {
  title: string;
  children: ReactNode;
}

const GroupBox = ({ title, children }: GroupBoxProps) => (
  <Box
    sx={(theme) => ({
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 2,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(3),
      position: "relative",
    })}
    data-colspan="12"
  >
    <Typography
      variant="subtitle1"
      sx={(theme) => ({
        position: "absolute",
        top: -12,
        left: 12,
        background: theme.palette.background.paper,
        padding: "0 6px",
        color: theme.palette.primary.main,
        fontWeight: 600,
      })}
    >
      {title}
    </Typography>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        columnGap: 3,
        rowGap: 2,
      }}
    >
      {children}
    </Box>
  </Box>
);

export default GroupBox;
