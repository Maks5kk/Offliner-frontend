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
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPasswordValidationSchema } from "../../hooks/useResetPasswordValidationSchema";
import { useFormatMessage } from "../../hooks/useFormatMessage";

interface Inputs {
  newPassword: string;
  confirmNewPassword: string;
  formError?: string;
}

export default function ResetPassword() {
  const { resetPassword } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();
  const validationSchema = useResetPasswordValidationSchema();
  const formattedMessage = useFormatMessage();

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
      toast.error(formattedMessage("error.token"));
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
        toast.error(formattedMessage("error.unknownError"));
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
            {formattedMessage("passwordReset.header")}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <TextField
                type="password"
                label={formattedMessage("passwordReset.newPasswordLabel")}
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
                label={formattedMessage("passwordReset.confirm")}
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
              {formattedMessage("passwordReset.btn")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
