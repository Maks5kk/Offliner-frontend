import { useForm, SubmitHandler } from "react-hook-form";
import Card from "@mui/material/Card";
import { Box, Button, CardContent, TextField, Typography } from "@mui/material";

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

type Inputs = {
  email: string;
  password: string;
};

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Typography
          variant="h3"
          gutterBottom
          fontFamily="default"
          color="#1976d2"
          fontWeight="bold"
          letterSpacing={4}
        >
          Authentication
        </Typography>
        <Card sx={{ width: "100%", maxWidth: 500 }}>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* поменять на mui form */}
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                {...register("email", {
                  required: true,
                  pattern: EMAIL_REGEXP,
                })}
                sx={{ mb: 1, mt: 1 }}
              />
              {errors.email && <span>Invalid Email</span>}
              <TextField
                type="password"
                id="standard-basic"
                label="Password"
                variant="standard"
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
                sx={{ mb: 1, mt: 1 }}
              />
              {errors.password && <span>Low password</span>}
              <Button sx={{ mt: 5 }} type="submit" variant="contained">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
