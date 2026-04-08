const descriptions = {
  fr: 'Je conçois, automatise et fais évoluer des applications web sur mesure pour les entreprises qui veulent gagner du temps, structurer leurs opérations ou lancer un nouveau produit. Du cadrage à la mise en production.',
  en: 'I design, automate and evolve custom web applications for businesses that want to save time, structure their operations or launch a new product. From scoping to production.',
};

export default (pageContext) => descriptions[pageContext.locale] || descriptions.fr;
