import { useValidationMessages } from "./useValidationMessages";
import * as Yup from "yup";

export const useResetPasswordValidationSchema = () => {
  const message = useValidationMessages();
  return Yup.object().shape({
    newPassword: Yup.string()
      .required(message.newPassordRequired)
      .min(8, message.passwordMin)
      .matches(/[A-Z]/, message.passwordUppercase)
      .matches(/\d/, message.passwordNumber)
      .matches(/[@$!%*?&]/, message.passwordSpecial),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], message.passwordsMustMatch)
      .required(message.passwordConfirmRequired),
  });
};
