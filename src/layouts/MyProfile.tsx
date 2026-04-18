import { useGetIdentity, useTranslate } from "react-admin";
import { Box, Paper, Typography, Avatar } from "@mui/material";

export const MyProfile = () => {
  const { data: identity, isLoading } = useGetIdentity();
  const translate = useTranslate();

  if (isLoading) return null;

  return (
    <Box sx={{ width: '50%', maxWidth: 800, margin: "0 auto" }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>
            {identity?.name?.[0] || "U"}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {identity?.name || translate("profile.default_user")}
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          {translate("profile.user_info")}
        </Typography>

        <Box sx={{ ml: 1 }}>
          <Typography><strong>{translate("profile.name")}:</strong> {identity?.name}</Typography>
          <Typography><strong>{translate("profile.nif")}:</strong> {identity?.nif}</Typography>
          <Typography><strong>{translate("profile.phone")}:</strong> {identity?.phone}</Typography>
          <Typography><strong>{translate("profile.email")}:</strong> {identity?.email}</Typography>
          <Typography><strong>{translate("profile.address")}:</strong> {identity?.address}</Typography>
          <Typography><strong>{translate("profile.postal_code")}:</strong> {identity?.postalcode}</Typography>
          <Typography><strong>{translate("profile.city")}:</strong> {identity?.city}</Typography>
          <Typography><strong>{translate("profile.role")}:</strong> {identity?.role}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};
