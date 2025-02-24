import { useAuthStore } from "../../store/useAuthStore";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required")
    .min(8, "Password must be at least 8 characters"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Repeat new password please!"),
});

interface Inputs {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function PasswordSettings() {
  const { updateProfile, isUpdating } = useAuthStore();
  const [serverError, setServerError] = useState("");
  const { t } = useTranslation();

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
        label={t("passwordSettings.currentPassword")}
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
        label={t("passwordSettings.newPassword")}
        type="password"
        {...register("newPassword")}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message || ""}
      />
      <TextField
        label={t("passwordSettings.confirmNewPassword")}
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
        {isUpdating ? <CircularProgress /> : t("passwordSettings.changeBtn")}
      </Button>
    </Box>
  );
}
