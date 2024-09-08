import React, { useState } from "react";
import CompanyInfoForm from "./CompanyInfoForm";
import PersonalInfoForm from "./PersonalInfoForm";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import { colors } from "@/theme/theme";
import PersonIcon from "@mui/icons-material/Person";
import TextButton from "@/components/atoms/buttons/TextButton/TextButton.component";

const BasicInfoForm = () => {
  const [image, setImage] = useState<string | null>(null);

  // Handle photo change
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle delete avatar
  const handleDeleteAvatar = () => {
    setImage(null);
  };

  return (
    <>
      {/* Avatar Change Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Avatar
          alt="Avatar"
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            objectFit: "contain",
            backgroundColor: "#f9fafb"
            // backgroundColor: "rgb(249, 250, 251)"
          }}
        >
          {image ? (
            <img
              src={image}
              alt="Avatar"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <PersonIcon sx={{ 
              color: '#212121'
             }} fontSize="medium" />
          )}
        </Avatar>
        <Box sx={{ display: "flex", gap: 2 }}>
          <ContainedButton
            textProps={{
              sx: {
                color: "white",
                fontWeight: "bold",
                fontSize: 14
              },
            }}
            text={<strong>{image ? "Change picture" : "Add picture"}</strong>}
            backgroundColor={colors.bridgeDarkPurple}
            onClick={() => document.getElementById("avatar-input")?.click()}
          />
          <TextButton
            textProps={{ 
              sx: {
                fontSize: 14
              }
             }}
            onClick={handleDeleteAvatar}
            startIcon={<DeleteIcon />}
            text={<strong>Delete</strong>}
          />

          <input
            type="file"
            id="avatar-input"
            hidden
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </Box>
      </Box>

      {/* Personal and Company Info Forms */}
      <PersonalInfoForm />
      <CompanyInfoForm />

      {/* Edit Survey Responses Section */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="body1"
          sx={{ color: "primary.main", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => {
            // Handle edit survey responses logic here
            console.log("Edit survey responses clicked");
          }}
        >
          Edit survey responses
        </Typography>
      </Box>
    </>
  );
};

export default BasicInfoForm;
