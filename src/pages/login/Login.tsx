import { useForm, SubmitHandler } from "react-hook-form";
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
import { LinkComponent } from "../../components/ui/Link";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface Inputs {
  email: string;
  password: string;
  formError?: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const { login, authUser } = useAuthStore();
  const navigate = useNavigate();

  const { email, password } = watch();

  useEffect(() => {
    clearErrors("formError");
  }, [clearErrors, email, password]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await login(data);
      if (authUser) {
        navigate("/");
      }
    } catch (error: any) {
      console.log("Login error:", error);
      if (error?.message) {
        setError("formError", {
          type: "manual",
          message: error.message || "Invalid credentials",
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
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Email"
                variant="outlined"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
              />
              <FormHelperText error>{errors.email?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
              />
              <FormHelperText error>{errors.password?.message}</FormHelperText>
            </FormControl>

            {errors.formError && (
              <FormControl fullWidth margin="normal">
                <FormHelperText error>
                  {errors.formError.message}
                </FormHelperText>
              </FormControl>
            )}

            <Button sx={{ mt: 3 }} type="submit" variant="contained" fullWidth>
              Login
            </Button>

            <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <LinkComponent
                to="/register"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Sign up
              </LinkComponent>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
