const titles = {
  fr: 'Alexandre Lessard – Solutions intégrées | Développeur full-stack | AL-SI',
  en: 'Alexandre Lessard – Integrated Solutions | Full-stack Developer | AL-SI',
};

export default (pageContext) => titles[pageContext.locale] || titles.fr;
