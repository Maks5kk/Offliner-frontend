import { useValidationMessages } from "./useValidationMessages";
import * as Yup from "yup";

export const usePasswordValidationSchema = () => {
  const message = useValidationMessages();
  return Yup.object().shape({
    currentPassword: Yup.string()
      .required(message.passwordRequired)
      .min(8, message.passwordMin),
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
