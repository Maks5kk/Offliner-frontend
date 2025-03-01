import { useAuthStore } from "../../store/useAuthStore";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useFormatMessage } from "../../hooks/useFormatMessage";
import { usePasswordValidationSchema } from "../../hooks/usePasswordValidationSchema";

interface Inputs {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function PasswordSettings() {
  const { updateProfile, isUpdating } = useAuthStore();
  const [serverError, setServerError] = useState("");
  const formattedMessage = useFormatMessage();
  const validationSchema = usePasswordValidationSchema();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  const onSubmit: SubmitHandler<Inputs> = async (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      await updateProfile({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
    } catch (error: any) {
      if (error.message === "Current password is incorrect") {
        setServerError("Current password is incorrect");
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <TextField
        label={formattedMessage("passwordSettings.currentPassword")}
        type="password"
        {...register("currentPassword")}
        error={!!errors.currentPassword}
        helperText={errors.currentPassword?.message || ""}
      />

      {serverError && (
        <Typography variant="caption" color="error">
          {serverError}
        </Typography>
      )}

      <TextField
        label={formattedMessage("passwordSettings.newPassword")}
        type="password"
        {...register("newPassword")}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message || ""}
      />
      <TextField
        label={formattedMessage("passwordSettings.confirmNewPassword")}
        type="password"
        {...register("confirmNewPassword")}
        error={!!errors.confirmNewPassword}
        helperText={errors.confirmNewPassword?.message || ""}
      />

      <Button
        variant="contained"
        onClick={handleFormSubmit}
        disabled={isUpdating || !isValid}
      >
        {isUpdating ? (
          <CircularProgress />
        ) : (
          formattedMessage("passwordSettings.changeBtn")
        )}
      </Button>
    </Box>
  );
}
