export enum Locales {
  RU = "ru",
  EN = "en",
}

export type MessageIds = FormatjsIntl.Message extends {
  ids: infer T;
}
  ? T extends string
    ? T
    : string
  : string;
