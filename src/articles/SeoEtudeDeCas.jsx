import ArticleLayout from '../components/ArticleLayout.jsx';
import { translations } from '../i18n';

const WipBadge = ({ label }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/[0.08] px-4 py-1.5 text-sm text-amber-400">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
    </span>
    {label}
  </div>
);

const SeoEtudeDeCas = ({ lang, onBack }) => {
  const t = translations[lang] || translations.fr;
  const article = t.articles.items.find((a) => a.slug === 'seo-etude-de-cas');
  const isFr = lang === 'fr';

  return (
    <ArticleLayout title={article.title} subtitle={article.subtitle} date={article.date} lang={lang} onBack={onBack} badge={<WipBadge label={article.wipLabel} />}>
      {isFr ? <ContentFr /> : <ContentEn />}
    </ArticleLayout>
  );
};

const ContentFr = () => (
  <>
    <h2>Contexte</h2>
    <p>
      Ce site (<strong>al-si.com</strong>) est mon portfolio personnel. Il a été concu initialement comme un site vitrine simple
      avec React, un fichier CSS custom et quelques animations basiques. Le site était fonctionnel, mais n'avait jamais été
      optimisé pour le SEO ou la performance.
    </p>
    <p>
      L'objectif de cette étude de cas est de documenter le processus complet d'optimisation, de l'audit initial aux résultats
      mesurables, en passant par chaque décision technique prise en cours de route.
    </p>

    <h2>Méthodologie</h2>
    <p>
      L'optimisation a suivi une démarche en cinq étapes, conçue pour être reproductible sur tout projet similaire.
    </p>
    <ol>
      <li>
        <strong>Audit initial</strong> — Établir une baseline mesurable : rankings Google (via SerpAPI), audit technique
        automatisé (meta tags, JSON-LD, sitemap, OG image), et analyse du build (taille du bundle, modules).
      </li>
      <li>
        <strong>Modernisation du stack</strong> — Mettre à jour les dépendances et l'architecture : migration CSS vers
        Tailwind v4, remplacement des librairies d'animation, refactoring des composants, HTML sémantique.
      </li>
      <li>
        <strong>Optimisation SEO technique</strong> — Corriger chaque problème identifié à l'audit : JSON-LD, meta tags,
        sitemap, image OG. Puis <strong>relancer l'audit technique</strong> pour valider que tous les checks passent
        avant de déployer. Si des problèmes persistent, corriger et re-tester jusqu'à atteindre un score parfait.
      </li>
      <li>
        <strong>Déploiement et indexation</strong> — Déployer en production, purger le cache CDN, soumettre le sitemap
        à Google Search Console et demander l'indexation de la page principale.
      </li>
      <li>
        <strong>Mesure des résultats</strong> — Après un délai d'indexation de 2 à 3 semaines, relancer les mesures
        de rankings, capturer les scores Lighthouse et analyser les données Search Console (impressions, clics, couverture).
      </li>
    </ol>

    <h2>État initial</h2>
    <p>
      Avant toute modification, j'ai réalisé un audit complet du site pour établir une baseline mesurable.
    </p>

    <h3>Rankings Google</h3>
    <table>
      <thead>
        <tr><th>Mot-clé</th><th>Position initiale</th><th>Position finale</th></tr>
      </thead>
      <tbody>
        <tr><td>Alexandre Lessard</td><td>Non trouvé (top 100)</td><td className="text-amber-400 italic">À venir</td></tr>
        <tr><td>Alexandre Lessard développeur</td><td>#1</td><td className="text-amber-400 italic">À venir</td></tr>
        <tr><td>Alexandre Lessard développeur web</td><td>#1</td><td className="text-amber-400 italic">À venir</td></tr>
        <tr><td>Alexandre Lessard Québec</td><td>Non trouvé</td><td className="text-amber-400 italic">À venir</td></tr>
        <tr><td>Alexandre Lessard full-stack</td><td>#1</td><td className="text-amber-400 italic">À venir</td></tr>
        <tr><td>développeur full-stack Québec</td><td>Non trouvé</td><td className="text-amber-400 italic">À venir</td></tr>
        <tr><td>al-si.com</td><td>Non trouvé</td><td className="text-amber-400 italic">À venir</td></tr>
      </tbody>
    </table>
    <p>
      <strong>Résumé :</strong> 3 mots-clés sur 7 trouvés dans le top 100. Position #1 sur les requêtes de nom + métier,
      mais absent sur le nom seul et les termes géolocalisés. Les positions finales seront mesurées 2 à 3 semaines après déploiement.
    </p>

    <h3>Audit technique</h3>
    <table>
      <thead>
        <tr><th>Vérification</th><th>Résultat</th></tr>
      </thead>
      <tbody>
        <tr><td>Meta tags</td><td>OK (12/12)</td></tr>
        <tr><td>JSON-LD</td><td>Invalide (virgule manquante)</td></tr>
        <tr><td>robots.txt</td><td>OK</td></tr>
        <tr><td>sitemap.xml</td><td>Contient des hash anchors invalides</td></tr>
        <tr><td>Image OG (share-card.png)</td><td>404 - manquante</td></tr>
        <tr><td>favicon.ico</td><td>OK</td></tr>
      </tbody>
    </table>
    <p><strong>Score :</strong> 6/8 vérifications passées.</p>

    <h3>Performance (build)</h3>
    <table>
      <thead>
        <tr><th>Métrique</th><th>Valeur</th></tr>
      </thead>
      <tbody>
        <tr><td>Bundle JS</td><td>209 KB (66 KB gzip)</td></tr>
        <tr><td>CSS</td><td>4.6 KB (1.6 KB gzip)</td></tr>
        <tr><td>Total estimé</td><td>~270 KB (~70 KB gzip)</td></tr>
        <tr><td>Modules transformés</td><td>60</td></tr>
      </tbody>
    </table>

    <h3>Problèmes identifiés</h3>
    <ol>
      <li><strong>JSON-LD cassé</strong> : erreur de syntaxe empêchant Google de lire les données structurées</li>
      <li><strong>Image OG manquante</strong> : partage sur les réseaux sociaux sans image</li>
      <li><strong>Sitemap avec hash anchors</strong> : URLs non crawlables par les moteurs de recherche</li>
      <li><strong>CSS orphelin</strong> : styles pour des éléments qui n'existent plus</li>
      <li><strong>Pas de balise main</strong> : structure HTML non sémantique</li>
      <li><strong>react-transition-group</strong> : dépendance lourde (~15 KB) pour une seule animation</li>
    </ol>

    <hr />

    <h2>Travaux réalisés et résultats</h2>

    <h3>Modernisation du stack</h3>
    <ul>
      <li>Migration de CSS custom vers <strong>Tailwind CSS v4</strong></li>
      <li>Remplacement de <code>react-transition-group</code> par <strong>Framer Motion</strong></li>
      <li>Création de composants réutilisables (<code>Button</code>, <code>SectionHeader</code>, <code>ScrollReveal</code>)</li>
      <li>Séparation de la navigation du footer dans son propre composant</li>
      <li>Refactoring complet de la structure des composants</li>
    </ul>

    <h3>Redesign visuel</h3>
    <ul>
      <li>Navigation fixe avec hide/show au scroll et backdrop blur</li>
      <li>Animations de scroll reveal sur toutes les sections</li>
      <li>Ajout de sections : Projets, Articles</li>
      <li>Photo personnelle dans le hero avec cadrage optimisé</li>
      <li>Dark theme raffiné avec système de couleurs cohérent</li>
    </ul>

    <h3>Optimisation SEO technique</h3>
    <ul>
      <li>Correction du JSON-LD (syntaxe + enrichissement des données)</li>
      <li>Création de l'image OG (<code>share-card.png</code>)</li>
      <li>Nettoyage du sitemap (retrait des hash anchors, ajout de lastmod)</li>
      <li>Ajout de <code>&lt;main&gt;</code> pour la sémantique HTML</li>
      <li>Meta description enrichie avec mots-clés cibles</li>
      <li>Ajout de <code>og:locale</code>, <code>meta robots</code>, et URLs OG absolues</li>
      <li>Enrichissement du JSON-LD : adresse (QC/CA), LinkedIn, langues, compétences</li>
    </ul>

    <h3>Repositionnement du contenu</h3>
    <ul>
      <li>Repositionnement du site vers applications web, SaaS et automatisation</li>
      <li>Réécriture de toutes les sections pour refléter le nouveau positionnement</li>
      <li>Ajout de l'expérience récente (plateforme SaaS construction) dans un bloc visuel séparé</li>
      <li>Meta tags, OG et JSON-LD réalignés sur le positionnement</li>
    </ul>

    <h3>Impact mesuré</h3>
    <table>
      <thead>
        <tr><th>Vérification SEO</th><th>Avant</th><th>Après</th></tr>
      </thead>
      <tbody>
        <tr><td>JSON-LD</td><td>Invalide</td><td>Valide + enrichi</td></tr>
        <tr><td>Image OG</td><td>404</td><td>OK (1200x630)</td></tr>
        <tr><td>Sitemap</td><td>Hash anchors</td><td>URL unique + lastmod</td></tr>
        <tr><td>HTML sémantique</td><td>Pas de main</td><td>main + sections</td></tr>
        <tr><td>Meta description</td><td>Générique</td><td>Mots-clés ciblés</td></tr>
        <tr><td>Score audit</td><td>6/8</td><td>8/8</td></tr>
      </tbody>
    </table>
    <p>
      Le bundle JS est passé de 209 KB à 371 KB (66 → 116 KB gzip), et le CSS de 4.6 KB à 33 KB (1.6 → 6.3 KB gzip).
      Cette augmentation s'explique par l'ajout de Framer Motion, Tailwind CSS v4, de nouvelles sections (Projets, Articles),
      un système de navigation complet, des animations sur chaque section et un article de fond. Malgré tout ce qui a été ajouté,
      le site reste léger — un résultat direct de l'optimisation effectuée en parallèle : suppression des dépendances inutiles,
      refactoring des composants et nettoyage du CSS orphelin.
    </p>

    <div className="mt-10 p-6 border border-accent/20 rounded-2xl bg-accent/[0.04] text-center">
      <p className="!mb-0 text-lg">
        <strong>Valeur estimée du projet : ~950 $</strong>
      </p>
      <p className="!mb-0 !mt-2 text-sm text-[var(--color-muted)]">
        Le coût d'un mandat équivalent peut varier selon l'analyse initiale, les rencontres et l'accompagnement au déploiement.
      </p>
    </div>

    <hr />

    <div className="mt-6 p-6 border border-amber-500/20 rounded-2xl bg-amber-500/[0.04]">
      <h2 className="!mt-0 !text-amber-400">À venir</h2>
      <p>Les sections suivantes seront ajoutées après le déploiement et un délai d'indexation de 2 à 3 semaines :</p>
      <ul>
        <li><strong>Réanalyse des rankings Google</strong> — comparaison avant/après sur les 7 mots-clés cibles</li>
        <li><strong>Audit Lighthouse</strong> — scores Performance, Accessibility, Best Practices, SEO</li>
        <li><strong>Analyse Google Search Console</strong> — impressions, clics et couverture de l'index</li>
        <li><strong>Bilan final</strong> — retour sur investissement et enseignements</li>
      </ul>
    </div>

    <hr />

    <h2>Conclusion provisoire</h2>
    <p>
      Cette étude de cas documente un projet en cours. Les gains les plus importants viennent souvent des corrections simples :
      un JSON-LD valide, une image OG qui existe, un sitemap propre. La modernisation du stack n'était pas strictement
      nécessaire pour le SEO, mais elle améliore la maintenabilité et l'expérience utilisateur.
    </p>
    <p>
      Il reste la mise en ligne officielle et le suivi des résultats SEO sur plusieurs semaines.
      Cet article sera mis à jour avec les données finales une fois le délai d'indexation écoulé.
    </p>

    <blockquote>
      <p>
        Le meilleur moment pour optimiser le SEO d'un site, c'est avant le lancement. Le deuxième meilleur moment, c'est maintenant.
      </p>
    </blockquote>
  </>
);

const ContentEn = () => (
  <>
    <h2>Context</h2>
    <p>
      This website (<strong>al-si.com</strong>) is my personal portfolio. It was initially built as a simple showcase site
      with React, a custom CSS file and basic animations. The site was functional, but had never been optimized for SEO
      or performance.
    </p>
    <p>
      The goal of this case study is to document the full optimization process, from the initial audit to measurable results,
      including every technical decision made along the way.
    </p>

    <h2>Methodology</h2>
    <p>
      The optimization followed a five-step process, designed to be reproducible on any similar project.
    </p>
    <ol>
      <li>
        <strong>Initial audit</strong> — Establish a measurable baseline: Google rankings (via SerpAPI), automated technical
        audit (meta tags, JSON-LD, sitemap, OG image), and build analysis (bundle size, modules).
      </li>
      <li>
        <strong>Stack modernization</strong> — Update dependencies and architecture: CSS migration to Tailwind v4,
        animation library replacement, component refactoring, semantic HTML.
      </li>
      <li>
        <strong>Technical SEO optimization</strong> — Fix every issue found in the audit: JSON-LD, meta tags, sitemap,
        OG image. Then <strong>re-run the technical audit</strong> to validate all checks pass before deploying.
        If issues remain, fix and re-test until achieving a perfect score.
      </li>
      <li>
        <strong>Deployment and indexing</strong> — Deploy to production, purge the CDN cache, submit the sitemap to
        Google Search Console and request indexing of the main page.
      </li>
      <li>
        <strong>Results measurement</strong> — After a 2 to 3 week indexing period, re-run ranking measurements,
        capture Lighthouse scores and analyze Search Console data (impressions, clicks, coverage).
      </li>
    </ol>

    <h2>Initial state</h2>
    <p>
      Before making any changes, I ran a complete audit to establish a measurable baseline.
    </p>

    <h3>Google rankings</h3>
    <table>
      <thead>
        <tr><th>Keyword</th><th>Initial position</th><th>Final position</th></tr>
      </thead>
      <tbody>
        <tr><td>Alexandre Lessard</td><td>Not found (top 100)</td><td className="text-amber-400 italic">Coming soon</td></tr>
        <tr><td>Alexandre Lessard développeur</td><td>#1</td><td className="text-amber-400 italic">Coming soon</td></tr>
        <tr><td>Alexandre Lessard développeur web</td><td>#1</td><td className="text-amber-400 italic">Coming soon</td></tr>
        <tr><td>Alexandre Lessard Québec</td><td>Not found</td><td className="text-amber-400 italic">Coming soon</td></tr>
        <tr><td>Alexandre Lessard full-stack</td><td>#1</td><td className="text-amber-400 italic">Coming soon</td></tr>
        <tr><td>développeur full-stack Québec</td><td>Not found</td><td className="text-amber-400 italic">Coming soon</td></tr>
        <tr><td>al-si.com</td><td>Not found</td><td className="text-amber-400 italic">Coming soon</td></tr>
      </tbody>
    </table>
    <p>
      <strong>Summary:</strong> 3 out of 7 keywords found in the top 100. Position #1 on name + profession queries,
      but absent on name alone and geolocated terms. Final positions will be measured 2 to 3 weeks after deployment.
    </p>

    <h3>Technical audit</h3>
    <table>
      <thead>
        <tr><th>Check</th><th>Result</th></tr>
      </thead>
      <tbody>
        <tr><td>Meta tags</td><td>OK (12/12)</td></tr>
        <tr><td>JSON-LD</td><td>Invalid (missing comma)</td></tr>
        <tr><td>robots.txt</td><td>OK</td></tr>
        <tr><td>sitemap.xml</td><td>Contains invalid hash anchors</td></tr>
        <tr><td>OG image (share-card.png)</td><td>404 - missing</td></tr>
        <tr><td>favicon.ico</td><td>OK</td></tr>
      </tbody>
    </table>
    <p><strong>Score:</strong> 6/8 checks passed.</p>

    <h3>Performance (build)</h3>
    <table>
      <thead>
        <tr><th>Metric</th><th>Value</th></tr>
      </thead>
      <tbody>
        <tr><td>JS bundle</td><td>209 KB (66 KB gzip)</td></tr>
        <tr><td>CSS</td><td>4.6 KB (1.6 KB gzip)</td></tr>
        <tr><td>Total estimate</td><td>~270 KB (~70 KB gzip)</td></tr>
        <tr><td>Modules transformed</td><td>60</td></tr>
      </tbody>
    </table>

    <h3>Issues identified</h3>
    <ol>
      <li><strong>Broken JSON-LD</strong>: syntax error preventing Google from reading structured data</li>
      <li><strong>Missing OG image</strong>: social media sharing without a preview image</li>
      <li><strong>Sitemap with hash anchors</strong>: non-crawlable URLs for search engines</li>
      <li><strong>Orphaned CSS</strong>: styles for elements that no longer exist</li>
      <li><strong>No main tag</strong>: non-semantic HTML structure</li>
      <li><strong>react-transition-group</strong>: heavy dependency (~15 KB) for a single animation</li>
    </ol>

    <hr />

    <h2>Work completed and results</h2>

    <h3>Stack modernization</h3>
    <ul>
      <li>Migration from custom CSS to <strong>Tailwind CSS v4</strong></li>
      <li>Replaced <code>react-transition-group</code> with <strong>Framer Motion</strong></li>
      <li>Created reusable components (<code>Button</code>, <code>SectionHeader</code>, <code>ScrollReveal</code>)</li>
      <li>Separated navigation from the footer into its own component</li>
      <li>Complete component structure refactoring</li>
    </ul>

    <h3>Visual redesign</h3>
    <ul>
      <li>Fixed navigation with hide/show on scroll and backdrop blur</li>
      <li>Scroll reveal animations on all sections</li>
      <li>Added sections: Projects, Articles</li>
      <li>Personal photo in the hero with optimized cropping</li>
      <li>Refined dark theme with consistent color system</li>
    </ul>

    <h3>Technical SEO optimization</h3>
    <ul>
      <li>Fixed JSON-LD (syntax + enriched data)</li>
      <li>Created OG image (<code>share-card.png</code>)</li>
      <li>Cleaned up sitemap (removed hash anchors, added lastmod)</li>
      <li>Added <code>&lt;main&gt;</code> for HTML semantics</li>
      <li>Enriched meta description with target keywords</li>
      <li>Added <code>og:locale</code>, <code>meta robots</code>, and absolute OG URLs</li>
      <li>Enriched JSON-LD: address (QC/CA), LinkedIn, languages, skills</li>
    </ul>

    <h3>Content repositioning</h3>
    <ul>
      <li>Repositioned the site toward web applications, SaaS and automation</li>
      <li>Rewrote all sections to reflect the new positioning</li>
      <li>Added recent experience (construction SaaS platform) in a separate visual block</li>
      <li>Realigned meta tags, OG and JSON-LD with the new positioning</li>
    </ul>

    <h3>Measured impact</h3>
    <table>
      <thead>
        <tr><th>SEO check</th><th>Before</th><th>After</th></tr>
      </thead>
      <tbody>
        <tr><td>JSON-LD</td><td>Invalid</td><td>Valid + enriched</td></tr>
        <tr><td>OG image</td><td>404</td><td>OK (1200x630)</td></tr>
        <tr><td>Sitemap</td><td>Hash anchors</td><td>Single URL + lastmod</td></tr>
        <tr><td>Semantic HTML</td><td>No main tag</td><td>main + sections</td></tr>
        <tr><td>Meta description</td><td>Generic</td><td>Targeted keywords</td></tr>
        <tr><td>Audit score</td><td>6/8</td><td>8/8</td></tr>
      </tbody>
    </table>
    <p>
      The JS bundle went from 209 KB to 371 KB (66 → 116 KB gzip), and CSS from 4.6 KB to 33 KB (1.6 → 6.3 KB gzip).
      This increase reflects the addition of Framer Motion, Tailwind CSS v4, new sections (Projects, Articles), a full
      navigation system, scroll animations on every section and an in-depth article. Despite everything that was added,
      the site remains lightweight — a direct result of the optimization work done in parallel: removing unused dependencies,
      refactoring components and cleaning up orphaned CSS.
    </p>

    <div className="mt-10 p-6 border border-accent/20 rounded-2xl bg-accent/[0.04] text-center">
      <p className="!mb-0 text-lg">
        <strong>Estimated project value: ~$950</strong>
      </p>
      <p className="!mb-0 !mt-2 text-sm text-[var(--color-muted)]">
        The cost of an equivalent engagement may vary depending on the initial analysis, meetings and deployment support.
      </p>
    </div>

    <hr />

    <div className="mt-6 p-6 border border-amber-500/20 rounded-2xl bg-amber-500/[0.04]">
      <h2 className="!mt-0 !text-amber-400">Coming soon</h2>
      <p>The following sections will be added after deployment and a 2 to 3 week indexing period:</p>
      <ul>
        <li><strong>Google rankings re-analysis</strong> — before/after comparison on all 7 target keywords</li>
        <li><strong>Lighthouse audit</strong> — Performance, Accessibility, Best Practices, SEO scores</li>
        <li><strong>Google Search Console analysis</strong> — impressions, clicks and index coverage</li>
        <li><strong>Final assessment</strong> — return on investment and key takeaways</li>
      </ul>
    </div>

    <hr />

    <h2>Interim conclusion</h2>
    <p>
      This case study documents an ongoing project. The biggest gains often come from simple fixes:
      valid JSON-LD, an OG image that exists, a clean sitemap. Modernizing the stack wasn't strictly
      necessary for SEO, but it improves maintainability and user experience.
    </p>
    <p>
      What remains is the official relaunch and tracking SEO results over several weeks.
      This article will be updated with final data once the indexing period has passed.
    </p>

    <blockquote>
      <p>
        The best time to optimize a site's SEO is before launch. The second best time is now.
      </p>
    </blockquote>
  </>
);

export default SeoEtudeDeCas;
