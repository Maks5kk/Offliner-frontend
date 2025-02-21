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
import { SubmitHandler, useForm } from "react-hook-form";
import { LinkComponent } from "../../components/ui/Link";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore";
import { EMAIL_REGEXP } from "../../constants/regex";

interface Inputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const { signup, isSigningUp } = useAuthStore();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const cleanedData = {
        ...data,
        email: data.email.trim(),
        fullName: data.fullName.trim(),
      };

      await signup(cleanedData);

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Error");
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
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Full Name"
                variant="outlined"
                {...register("fullName", {
                  required: "Name is required",
                })}
                error={!!errors.fullName}
              />
              <FormHelperText error>{errors.fullName?.message}</FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: EMAIL_REGEXP, message: "Invalid email" },
                })}
                error={!!errors.email}
              />
              <FormHelperText error>{errors.email?.message}</FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                })}
                error={!!errors.password}
              />
              <FormHelperText error>{errors.password?.message}</FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                type="password"
                label="Confirm Password"
                variant="outlined"
                {...register("confirmPassword", {
                  required: "Repeat your password",
                  validate: (value) =>
                    value === watch("password") || "Password does not match",
                })}
                error={!!errors.confirmPassword}
              />
              <FormHelperText error>
                {errors.confirmPassword?.message}
              </FormHelperText>
            </FormControl>

            <Button
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSigningUp}
            >
              {isSigningUp ? "Loading..." : "Registration"}
            </Button>

            <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <LinkComponent
                to="/login"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Login
              </LinkComponent>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
