const descriptions = {
  fr: "Consultant en intégration de systèmes. On m'appelle quand les logiciels d'une entreprise ne se parlent pas, quand une plateforme doit évoluer sans documentation ou quand la solution n'existe pas sur le marché. Du cadrage à la mise en production.",
  en: "Systems integration consultant. I get the call when a company's systems don't talk to each other, when a platform has to evolve without documentation, or when the solution doesn't exist on the market. From scoping to production.",
};

export default (pageContext) => descriptions[pageContext.locale] || descriptions.fr;
