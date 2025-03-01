export enum Locales {
  Ru = "ru",
  En = "en",
}

export type MessageIds = FormatjsIntl.Message extends {
  ids: infer T;
}
  ? T extends string
    ? T
    : string
  : string;
