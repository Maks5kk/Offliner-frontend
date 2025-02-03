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

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await login(data);
    navigate("/");
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

            <Button
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Loading..." : "Login"}
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
