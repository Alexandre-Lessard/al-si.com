const titles = {
  fr: 'Alexandre Lessard – Solutions intégrées | Consultant en intégration de systèmes | AL-SI',
  en: 'Alexandre Lessard – Integrated Solutions | Systems Integration Consultant | AL-SI',
};

export default (pageContext) => titles[pageContext.locale] || titles.fr;
