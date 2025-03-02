import { useCallback } from "react";
import { useIntl } from "react-intl";

import { FormatXMLElementFn, PrimitiveType } from "intl-messageformat";
import { FieldPath } from "react-hook-form";
import ruLocales from "../public/locales/ru";

type Values = Record<
  string,
  PrimitiveType | FormatXMLElementFn<string, string>
>;

export type FormatMessageKey = FieldPath<typeof ruLocales>;

export type FormatMessage = (id: FormatMessageKey, values?: Values) => string;

export function useFormatMessage(): FormatMessage {
  const intl = useIntl();
  return useCallback(
    (id, values) => intl.formatMessage({ id }, values),
    [intl]
  );
}
