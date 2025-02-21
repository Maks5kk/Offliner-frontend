import { useRef, useState } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import { useAuthStore } from "../../store/useAuthStore";
import { PhotoCamera } from "@mui/icons-material";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .required(),
  newFullName: Yup.string().required(),
  profilePicFile: Yup.mixed<File>().nullable().notRequired(),
  profilePicUrl: Yup.string().notRequired(),
});

interface Inputs {
  newEmail: string;
  newFullName: string;
  profilePicFile?: File | null;
  profilePicUrl?: string | null;
}

const ProfileSettings = () => {
  const { authUser, updateProfile, isUpdating } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      newEmail: authUser?.email || "",
      newFullName: authUser?.fullName || "",
      profilePicFile: null,
      profilePicUrl: authUser?.profilePic || "",
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await updateProfile({
      newFullName: data.newFullName,
      newEmail: data.newEmail,
      profilePicFile: data.profilePicFile || null,
    });

    setIsEditing(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setValue("profilePicFile", file);
      setValue("profilePicUrl", imageUrl);
    }
  };

  console.log(watch());

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={2}
      maxWidth={600}
      alignItems="center"
    >
      <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
        <TextField
          label="Full Name"
          type="text"
          {...register("newFullName")}
          error={!!errors.newFullName}
          disabled={!isEditing}
          helperText={errors.newFullName?.message || ""}
        />
        <TextField
          label="Email"
          type="email"
          {...register("newEmail")}
          error={!!errors.newEmail}
          disabled={!isEditing}
          helperText={errors.newEmail?.message || ""}
        />

        {isEditing ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
            disabled={isUpdating}
          >
            {isUpdating ? <CircularProgress size={24} /> : "Save"}
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </Box>

      <Box sx={{ position: "relative", textAlign: "center" }}>
        <Avatar
          alt="Profile Picture"
          src={watch("profilePicUrl") || ""}
          sx={{
            width: 100,
            height: 100,
            marginBottom: 1,
            border: "2px solid #f0f0f0",
          }}
        />

        <Box sx={{ marginTop: 1 }}>
          <IconButton
            disabled={!isEditing}
            color="primary"
            onClick={() => fileInputRef.current?.click()}
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: "50%",
              padding: "8px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <PhotoCamera />
          </IconButton>
        </Box>

        <Typography variant="caption" sx={{ marginTop: 0.5 }}>
          Change Avatar
        </Typography>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </Box>
    </Box>
  );
};

export default ProfileSettings;
