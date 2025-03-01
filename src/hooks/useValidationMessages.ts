import { useFormatMessage } from "./useFormatMessage";

export const useValidationMessages = () => {
  const formattedMessage = useFormatMessage();

  return {
    passwordRequired: formattedMessage("validation.passwordRequired"),
    newPassordRequired: formattedMessage("validation.newPasswordRequired"),
    passwordMin: formattedMessage("validation.passwordMin"),
    passwordUppercase: formattedMessage("validation.passwordUppercase"),
    passwordNumber: formattedMessage("validation.passwordNumber"),
    passwordSpecial: formattedMessage("validation.passwordSpecial"),
    passwordsMustMatch: formattedMessage("validation.passwordsMustMatch"),
    passwordConfirmRequired: formattedMessage("validation.passwordConfirmRequired"),

    emailError: formattedMessage("validation.emailError"),
    emailRequired: formattedMessage("validation.emailRequired")

  };
};
