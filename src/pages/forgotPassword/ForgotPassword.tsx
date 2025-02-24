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
import * as Yup from "yup";
import { useAuthStore } from "../../store/useAuthStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Email } from "@mui/icons-material";
import { toast } from "react-toastify";

interface Inputs {
  email: string;
  formError?: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Incorrect email format")
    .required(),
});

export default function ForgotPassword() {
  const { forgotPassword } = useAuthStore();

  const onSubmit: SubmitHandler<Inputs> = async (email) => {
    try {
      await forgotPassword(email);
    } catch (error: any) {
      if (error.message) {
        setError("formError", {
          type: "manual",
          message: error.message || "Invalid email",
        });
      } else {
        toast.error("An unknown error occurred");
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
            color="#1976d2"
            fontWeight="bold"
            textAlign="center"
          >
            Provide your email
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <TextField
                {...register("email", { required: "Email is required!" })}
                label="Email"
                variant="outlined"
                error={!!errors.email}
              />
              <FormHelperText error>{errors.email?.message}</FormHelperText>
            </FormControl>
            <Button sx={{ mt: 3 }} type="submit" variant="contained" fullWidth>
              Change your password
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
