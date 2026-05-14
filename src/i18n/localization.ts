interface GlobalLocale {
  label: string;
  code: string;
  value: string;
  fullCode: string;
}

const locales: GlobalLocale[] = [
  {
    label: "English",
    code: "en",
    value: "en",
    fullCode: "en-US",
  },
  {
    label: "Українська",
    code: "uk",
    value: "uk",
    fullCode: "uk-UA",
  },
];

const localesArray = locales.map((i) => i.code);

export { locales, localesArray };
