import { EMAIL_REGEXP } from "../constants/regex";
import { useValidationMessages } from "./useValidationMessages";
import * as Yup from "yup";

export const useProfileSettingsValidationSchema = () => {
  const message = useValidationMessages();
  return Yup.object().shape({
    newEmail: Yup.string().matches(EMAIL_REGEXP, message.emailError).required(message.emailRequired),
    newFullName: Yup.string().required(),
    profilePicFile: Yup.mixed<File>().nullable().notRequired(),
    profilePicUrl: Yup.string().notRequired(),
  });
};
