import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
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
  newPassword: string;
  confirmNewPassword: string;
  formError?: string;
}

export default function ResetPassword() {
  const { resetPassword } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ newPassword }) => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }
    try {
      await resetPassword({ token, newPassword });
      navigate("/login");
    } catch (error: any) {
      if (error?.message) {
        setError("formError", {
          type: "manual",
          message: error.message,
        });
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400, p: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            color="#1976d2"
            fontWeight="bold"
            textAlign="center"
          >
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <TextField
                type="password"
                label="New Password"
                variant="outlined"
                {...register("newPassword")}
                error={!!errors.newPassword}
              />
              <FormHelperText error>
                {errors.newPassword?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                type="password"
                label="Confirm New Password"
                variant="outlined"
                {...register("confirmNewPassword")}
                error={!!errors.confirmNewPassword}
              />
              <FormHelperText error>
                {errors.confirmNewPassword?.message}
              </FormHelperText>
            </FormControl>

            {errors.formError && (
              <FormControl fullWidth margin="normal">
                <FormHelperText error>
                  {errors.formError.message}
                </FormHelperText>
              </FormControl>
            )}

            <Button sx={{ mt: 3 }} type="submit" variant="contained" fullWidth>
              Reset
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
