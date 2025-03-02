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
import { LinkComponent } from "@components/ui/Link";
import { useAuthStore } from "@store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useFormatMessage } from "@hooks/useFormatMessage";
import { EMAIL_REGEXP } from "../../constants/regex";
import { COLORS } from "shared/constants";

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
  const formattedMessage = useFormatMessage();

  useEffect(() => {
    clearErrors("formError");
  }, [clearErrors, email, password]);

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await login(data);
    } catch (error: any) {
      console.log(formattedMessage("error.loginError"), error);
      if (error?.message) {
        setError("formError", {
          type: "manual",
          message: error.message || formattedMessage("error.invalidCred"),
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
            color={COLORS.primary}
            fontWeight="bold"
            textAlign="center"
          >
            {formattedMessage("loginPage.login")}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: formattedMessage("validation.emailRequired"),
                  pattern: EMAIL_REGEXP,
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
                  required: formattedMessage("validation.passwordRequired"),
                })}
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
              {formattedMessage("loginPage.login")}
            </Button>
            <Box>
              <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                {formattedMessage("loginPage.dontHave")}
                <LinkComponent
                  to="/register"
                  style={{ color: COLORS.primary, textDecoration: "none" }}
                >
                  {formattedMessage("loginPage.signUp")}
                </LinkComponent>
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                {formattedMessage("loginPage.forgotPass")}{" "}
                <LinkComponent
                  to="/forgot-password"
                  style={{ color: COLORS.primary, textDecoration: "none" }}
                >
                  {formattedMessage("loginPage.click")}
                </LinkComponent>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
