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
import { useAuthStore } from "@store/useAuthStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Email } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useForgotPasswordValidationSchema } from "@hooks/useForgotPasswordValidationSchema";
import { useFormatMessage } from "@hooks/useFormatMessage";
import { COLORS } from "shared/constants";

interface Inputs {
  email: string;
  formError?: string;
}

export default function ForgotPassword() {
  const { forgotPassword } = useAuthStore();
  const validationSchema = useForgotPasswordValidationSchema();
  const formattedMessage = useFormatMessage();

  const onSubmit: SubmitHandler<Inputs> = async (email) => {
    try {
      await forgotPassword(email);
    } catch (error: any) {
      if (error.message) {
        setError("formError", {
          type: "manual",
          message: error.message,
        });
      } else {
        toast.error(formattedMessage("error.unknownError"));
      }
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    clearErrors("formError");
  }, [clearErrors, Email]);

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
            color={COLORS.primary}
            fontWeight="bold"
            textAlign="center"
          >
            {formattedMessage("passwordReset.header")}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <TextField
                {...register("email")}
                label="Email"
                variant="outlined"
                error={!!errors.email}
              />
              <FormHelperText error>{errors.email?.message}</FormHelperText>
            </FormControl>
            <Button sx={{ mt: 3 }} type="submit" variant="contained" fullWidth>
              {formattedMessage("passwordReset.getLinkBtn")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
