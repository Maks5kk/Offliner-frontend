import * as Yup from "yup";

export const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export const PASSWORD_REGEX = Yup.string()
  .required("New password is required")
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(/[@$!%*?&]/, "Password must contain at least one special character");

export const CONFIRM_PASSWORD_REGEX = Yup.string()
  .oneOf([Yup.ref("newPassword")], "Passwords must match")
  .required("Repeat new password please!");
