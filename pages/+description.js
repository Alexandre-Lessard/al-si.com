const descriptions = {
  fr: "Consultant en intégration de systèmes au Québec. On m'appelle quand les logiciels d'une entreprise ne se parlent pas ou quand la solution n'existe pas.",
  en: "Systems integration consultant in Quebec. I get the call when a company's systems don't talk to each other, or when the solution doesn't exist yet.",
};

export default (pageContext) => descriptions[pageContext.locale] || descriptions.fr;
