import { EMAIL_REGEXP } from "../constants/regex";
import { useValidationMessages } from "./useValidationMessages";
import * as Yup from "yup";

export const useForgotPasswordValidationSchema = () => {
  const message = useValidationMessages();
  return Yup.object().shape({
    email: Yup.string().matches(EMAIL_REGEXP, message.emailError).required(),
  });
};
