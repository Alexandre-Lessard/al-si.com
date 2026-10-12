const titles = {
  fr: 'Alexandre Lessard – Consultant en intégration de systèmes | AL-SI',
  en: 'Alexandre Lessard – Systems Integration Consultant | AL-SI',
};

export default (pageContext) => titles[pageContext.locale] || titles.fr;
