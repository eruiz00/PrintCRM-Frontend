import { useGetIdentity } from "react-admin";
import { Box, Paper, Typography, Avatar } from "@mui/material";

export const MyProfile = () => {
  const { data: identity, isLoading } = useGetIdentity();

  if (isLoading) return null;

  return (
    <Box sx={{ width:'50%', maxWidth: 800, margin: "0 auto" }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>
            {identity?.name?.[0] || "U"}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {identity?.name || "Usuario"}
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Información del usuario
        </Typography>

        <Box sx={{ ml: 1 }}>
          <Typography><strong>Nombre:</strong> {identity?.name}</Typography>
          <Typography><strong>Nif:</strong> {identity?.nif}</Typography>
          <Typography><strong>Teléfono:</strong> {identity?.phone}</Typography>
          <Typography><strong>Correo:</strong> {identity?.email}</Typography>
          <Typography><strong>Dirección:</strong> {identity?.address}</Typography>
          <Typography><strong>CP:</strong> {identity?.postalcode}</Typography>
          <Typography><strong>Ciudad:</strong> {identity?.city}</Typography>
          {identity?.role && (
            <Typography><strong>Rol:</strong> {identity.role}</Typography>
          )}
        </Box>

      </Paper>
    </Box>
  );
};



