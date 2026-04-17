import ArticleLayout from '../components/ArticleLayout.jsx';
import { translations } from '../i18n';

const SeoEtudeDeCas = ({ lang, onBack }) => {
  const t = translations[lang] || translations.fr;
  const article = t.articles.items.find((a) => a.slug === 'seo-etude-de-cas');
  const isFr = lang === 'fr';

  return (
    <ArticleLayout title={article.title} subtitle={article.subtitle} date={article.date} lang={lang} onBack={onBack}>
      {isFr ? <ContentFr /> : <ContentEn />}
    </ArticleLayout>
  );
};

const ContentFr = () => (
  <>
    <h2>Contexte</h2>
    <p>
      Ce site (<strong>al-si.com</strong>) est mon portfolio personnel. Il a été concu initialement comme un site
      vitrine simple avec React, un fichier CSS custom et quelques animations basiques. Le site était fonctionnel, mais
      n'avait jamais été optimisé pour le SEO ou la performance.
    </p>
    <p>
      L'objectif de cette étude de cas est de documenter le processus complet d'optimisation, de l'audit initial aux
      résultats mesurables, en passant par chaque décision technique prise en cours de route.
    </p>

    <h2>Méthodologie</h2>
    <p>L'optimisation a suivi une démarche en cinq étapes, conçue pour être reproductible sur tout projet similaire.</p>
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
        <strong>Déploiement et indexation</strong> — Déployer en production, purger le cache CDN, soumettre le sitemap à
        Google Search Console et demander l'indexation de la page principale.
      </li>
      <li>
        <strong>Mesure des résultats</strong> — Après un délai d'indexation de 2 à 3 semaines, relancer les mesures de
        rankings, capturer les scores Lighthouse et analyser les données Search Console (impressions, clics,
        couverture).
      </li>
    </ol>

    <h2>État initial</h2>
    <p>Avant toute modification, j'ai réalisé un audit complet du site pour établir une baseline mesurable.</p>

    <h3>Rankings Google</h3>
    <table>
      <thead>
        <tr>
          <th>Mot-clé</th>
          <th>Position initiale</th>
          <th>Position finale</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alexandre Lessard</td>
          <td>Non trouvé (top 100)</td>
          <td>Non trouvé</td>
        </tr>
        <tr>
          <td>Alexandre Lessard développeur</td>
          <td>#1</td>
          <td>#3</td>
        </tr>
        <tr>
          <td>Alexandre Lessard développeur web</td>
          <td>#1</td>
          <td>#2</td>
        </tr>
        <tr>
          <td>Alexandre Lessard Québec</td>
          <td>Non trouvé</td>
          <td>Non trouvé</td>
        </tr>
        <tr>
          <td>Alexandre Lessard full-stack</td>
          <td>#1</td>
          <td>#1</td>
        </tr>
        <tr>
          <td>développeur full-stack Québec</td>
          <td>Non trouvé</td>
          <td>Non trouvé</td>
        </tr>
        <tr>
          <td>al-si.com</td>
          <td>Non trouvé</td>
          <td className="text-accent font-medium">#1</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Résumé :</strong> 3 mots-clés sur 7 trouvés dans le top 100 avant les travaux. Position #1 sur les
      requêtes « nom + métier », mais absent sur le nom seul, les termes géolocalisés et la marque « al-si.com ». Les
      positions finales ont été mesurées environ 40 jours après le déploiement. Le gain notable : la marque « al-si.com
      » entre en #1, auparavant introuvable. Les légères baisses sur « développeur » et « développeur web » s'expliquent
      par la migration ultérieure vers des routes <code>/fr</code> et <code>/en</code>, qui répartit temporairement
      l'autorité entre la racine et les nouvelles URL. L'absence persistante sur les termes très concurrentiels (nom
      seul, termes géolocalisés) reste cohérente avec l'écosystème de résultats dominé par des homonymes et des pages
      entreprises établies.
    </p>

    <h3>Audit technique</h3>
    <table>
      <thead>
        <tr>
          <th>Vérification</th>
          <th>Résultat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Meta tags</td>
          <td>OK (12/12)</td>
        </tr>
        <tr>
          <td>JSON-LD</td>
          <td>Invalide (virgule manquante)</td>
        </tr>
        <tr>
          <td>robots.txt</td>
          <td>OK</td>
        </tr>
        <tr>
          <td>sitemap.xml</td>
          <td>Contient des hash anchors invalides</td>
        </tr>
        <tr>
          <td>Image OG (share-card.png)</td>
          <td>404 - manquante</td>
        </tr>
        <tr>
          <td>favicon.ico</td>
          <td>OK</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Score :</strong> 6/8 vérifications passées.
    </p>

    <h3>Performance (build)</h3>
    <table>
      <thead>
        <tr>
          <th>Métrique</th>
          <th>Valeur</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bundle JS</td>
          <td>209 KB (66 KB gzip)</td>
        </tr>
        <tr>
          <td>CSS</td>
          <td>4.6 KB (1.6 KB gzip)</td>
        </tr>
        <tr>
          <td>Total estimé</td>
          <td>~270 KB (~70 KB gzip)</td>
        </tr>
        <tr>
          <td>Modules transformés</td>
          <td>60</td>
        </tr>
      </tbody>
    </table>

    <h3>Problèmes identifiés</h3>
    <ol>
      <li>
        <strong>JSON-LD cassé</strong> : erreur de syntaxe empêchant Google de lire les données structurées
      </li>
      <li>
        <strong>Image OG manquante</strong> : partage sur les réseaux sociaux sans image
      </li>
      <li>
        <strong>Sitemap avec hash anchors</strong> : URLs non crawlables par les moteurs de recherche
      </li>
      <li>
        <strong>CSS orphelin</strong> : styles pour des éléments qui n'existent plus
      </li>
      <li>
        <strong>Pas de balise main</strong> : structure HTML non sémantique
      </li>
      <li>
        <strong>react-transition-group</strong> : dépendance lourde (~15 KB) pour une seule animation
      </li>
    </ol>

    <hr />

    <h2>Travaux réalisés et résultats</h2>

    <h3>Modernisation du stack</h3>
    <ul>
      <li>
        Migration de CSS custom vers <strong>Tailwind CSS v4</strong>
      </li>
      <li>
        Remplacement de <code>react-transition-group</code> par <strong>Framer Motion</strong>
      </li>
      <li>
        Création de composants réutilisables (<code>Button</code>, <code>SectionHeader</code>, <code>ScrollReveal</code>
        )
      </li>
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
      <li>
        Création de l'image OG (<code>share-card.png</code>)
      </li>
      <li>Nettoyage du sitemap (retrait des hash anchors, ajout de lastmod)</li>
      <li>
        Ajout de <code>&lt;main&gt;</code> pour la sémantique HTML
      </li>
      <li>Meta description enrichie avec mots-clés cibles</li>
      <li>
        Ajout de <code>og:locale</code>, <code>meta robots</code>, et URLs OG absolues
      </li>
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
        <tr>
          <th>Vérification SEO</th>
          <th>Avant</th>
          <th>Après</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>JSON-LD</td>
          <td>Invalide</td>
          <td>Valide + enrichi</td>
        </tr>
        <tr>
          <td>Image OG</td>
          <td>404</td>
          <td>OK (1200x630)</td>
        </tr>
        <tr>
          <td>Sitemap</td>
          <td>Hash anchors</td>
          <td>URL unique + lastmod</td>
        </tr>
        <tr>
          <td>HTML sémantique</td>
          <td>Pas de main</td>
          <td>main + sections</td>
        </tr>
        <tr>
          <td>Meta description</td>
          <td>Générique</td>
          <td>Mots-clés ciblés</td>
        </tr>
        <tr>
          <td>Score audit</td>
          <td>6/8</td>
          <td>8/8</td>
        </tr>
      </tbody>
    </table>
    <p>
      Le bundle JS est passé de 209 KB à 371 KB (66 → 116 KB gzip), et le CSS de 4.6 KB à 33 KB (1.6 → 6.3 KB gzip).
      Cette augmentation s'explique par l'ajout de Framer Motion, Tailwind CSS v4, de nouvelles sections (Projets,
      Articles), un système de navigation complet, des animations sur chaque section et un article de fond. Malgré tout
      ce qui a été ajouté, le site reste léger — un résultat direct de l'optimisation effectuée en parallèle :
      suppression des dépendances inutiles, refactoring des composants et nettoyage du CSS orphelin.
    </p>

    <hr />

    <h2>Résultats mesurés après indexation</h2>
    <p>
      Les mesures suivantes ont été capturées environ 40 jours après le déploiement, laissant le temps à Google de
      recrawler et ré-indexer le site. Entre-temps, plusieurs itérations de copywriting et une migration vers Vike SSG
      (routes <code>/fr</code> et <code>/en</code>) ont aussi été appliquées. Les chiffres reflètent donc l'état complet
      du site au moment de la mesure.
    </p>

    <h3>Google Search Console (3 derniers mois)</h3>
    <table>
      <thead>
        <tr>
          <th>Métrique</th>
          <th>Valeur (17 janv. → 17 avr. 2026)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Impressions</td>
          <td>206</td>
        </tr>
        <tr>
          <td>Clics</td>
          <td>2</td>
        </tr>
        <tr>
          <td>CTR moyen</td>
          <td>0,97 %</td>
        </tr>
        <tr>
          <td>Position moyenne (page d'accueil)</td>
          <td>2,32</td>
        </tr>
      </tbody>
    </table>
    <p>
      Le pic notable : le 6 avril, la page d'accueil a enregistré <strong>145 impressions en position #1</strong> en une
      seule journée, alors que la moyenne des semaines précédentes oscillait entre 0 et 4 impressions par jour. Search
      Console a relevé une hausse d'impressions de <strong>+7 250 %</strong> sur la page d'accueil comparée à la période
      précédente — effet direct du redéploiement après corrections (sitemap propre, JSON-LD valide, cache CDN purgé). La
      migration Vike a par ailleurs permis à Google d'indexer les pages <code>/fr</code> et <code>/en</code> en moins de
      4 jours, avec un premier clic organique enregistré sur <code>/fr</code> dès le 15 avril.
    </p>

    <h3>Audit Lighthouse</h3>
    <table>
      <thead>
        <tr>
          <th>Catégorie</th>
          <th>Desktop</th>
          <th>Mobile</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Accessibilité</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <td>Bonnes pratiques</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <td>SEO</td>
          <td>92</td>
          <td>92</td>
        </tr>
      </tbody>
    </table>
    <p>
      Le score <strong>Performance</strong> reste perfectible et n'est volontairement pas affiché ici. Le trade-off a
      été assumé : les animations (Framer Motion), la modernisation du stack (Vike SSG, Tailwind v4) et le contenu
      enrichi — dont cet article — ont été priorisés sur l'optimisation micro-performance. Les scores exacts sont
      accessibles publiquement sur{' '}
      <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fal-si.com%2F" target="_blank" rel="noreferrer">
        PageSpeed Insights
      </a>
      . Une mise à jour de cet article viendra lorsque ces chiffres évolueront.
    </p>

    <div className="mt-10 p-6 border border-accent/20 rounded-2xl bg-accent/[0.04] text-center">
      <p className="!mb-0 text-lg">
        <strong>Valeur estimée du projet : ~950 $</strong>
      </p>
      <p className="!mb-0 !mt-2 text-sm text-[var(--color-muted)]">
        Le coût d'un mandat équivalent peut varier selon l'analyse initiale, les rencontres et l'accompagnement au
        déploiement.
      </p>
    </div>

    <hr />

    <h2>Conclusion</h2>
    <p>
      Les gains les plus importants viennent souvent des corrections les plus simples : un JSON-LD valide, une image OG
      qui existe, un sitemap propre. La modernisation du stack n'était pas strictement nécessaire pour le SEO, mais elle
      améliore la maintenabilité, l'expérience utilisateur, et permet d'itérer plus rapidement sur le contenu et la
      conversion.
    </p>
    <p>
      Bilan chiffré : audit technique passé de 6/8 à 8/8, marque « al-si.com » qui entre en #1, hausse d'impressions de
      +7 250 % sur la page d'accueil au pic, indexation des routes bilingues en moins d'une semaine. Les positions sur
      certaines requêtes « nom + métier » ont légèrement baissé suite à la migration /fr /en — effet temporaire de
      redistribution d'autorité qui devrait se résorber à mesure que Google consolide l'index.
    </p>
    <p>
      Au final, le SEO n'est pas une action one-shot : c'est une hygiène technique continue. La bonne nouvelle, c'est
      que les corrections les plus impactantes sont souvent les plus simples — il faut juste mesurer avant de toucher.
    </p>

    <blockquote>
      <p>
        Le meilleur moment pour optimiser le SEO d'un site, c'est avant le lancement. Le deuxième meilleur moment, c'est
        maintenant.
      </p>
    </blockquote>
  </>
);

const ContentEn = () => (
  <>
    <h2>Context</h2>
    <p>
      This website (<strong>al-si.com</strong>) is my personal portfolio. It was initially built as a simple showcase
      site with React, a custom CSS file and basic animations. The site was functional, but had never been optimized for
      SEO or performance.
    </p>
    <p>
      The goal of this case study is to document the full optimization process, from the initial audit to measurable
      results, including every technical decision made along the way.
    </p>

    <h2>Methodology</h2>
    <p>The optimization followed a five-step process, designed to be reproducible on any similar project.</p>
    <ol>
      <li>
        <strong>Initial audit</strong> — Establish a measurable baseline: Google rankings (via SerpAPI), automated
        technical audit (meta tags, JSON-LD, sitemap, OG image), and build analysis (bundle size, modules).
      </li>
      <li>
        <strong>Stack modernization</strong> — Update dependencies and architecture: CSS migration to Tailwind v4,
        animation library replacement, component refactoring, semantic HTML.
      </li>
      <li>
        <strong>Technical SEO optimization</strong> — Fix every issue found in the audit: JSON-LD, meta tags, sitemap,
        OG image. Then <strong>re-run the technical audit</strong> to validate all checks pass before deploying. If
        issues remain, fix and re-test until achieving a perfect score.
      </li>
      <li>
        <strong>Deployment and indexing</strong> — Deploy to production, purge the CDN cache, submit the sitemap to
        Google Search Console and request indexing of the main page.
      </li>
      <li>
        <strong>Results measurement</strong> — After a 2 to 3 week indexing period, re-run ranking measurements, capture
        Lighthouse scores and analyze Search Console data (impressions, clicks, coverage).
      </li>
    </ol>

    <h2>Initial state</h2>
    <p>Before making any changes, I ran a complete audit to establish a measurable baseline.</p>

    <h3>Google rankings</h3>
    <table>
      <thead>
        <tr>
          <th>Keyword</th>
          <th>Initial position</th>
          <th>Final position</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alexandre Lessard</td>
          <td>Not found (top 100)</td>
          <td>Not found</td>
        </tr>
        <tr>
          <td>Alexandre Lessard développeur</td>
          <td>#1</td>
          <td>#3</td>
        </tr>
        <tr>
          <td>Alexandre Lessard développeur web</td>
          <td>#1</td>
          <td>#2</td>
        </tr>
        <tr>
          <td>Alexandre Lessard Québec</td>
          <td>Not found</td>
          <td>Not found</td>
        </tr>
        <tr>
          <td>Alexandre Lessard full-stack</td>
          <td>#1</td>
          <td>#1</td>
        </tr>
        <tr>
          <td>développeur full-stack Québec</td>
          <td>Not found</td>
          <td>Not found</td>
        </tr>
        <tr>
          <td>al-si.com</td>
          <td>Not found</td>
          <td className="text-accent font-medium">#1</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Summary:</strong> 3 out of 7 keywords found in the top 100 before the work. Position #1 on name +
      profession queries, but absent on name alone, geolocated terms and the brand term (al-si.com). Final positions
      were measured about 40 days after deployment. The notable gain: the brand term &ldquo;al-si.com&rdquo; now ranks
      #1, previously not found. The slight drops on &ldquo;développeur&rdquo; and &ldquo;développeur web&rdquo; are
      explained by the later migration to <code>/fr</code> and <code>/en</code> routes, which temporarily redistributes
      authority between the root and the new URLs. The persistent absence on highly competitive terms (name alone,
      geolocated terms) remains consistent with a results ecosystem dominated by homonyms and established company pages.
    </p>

    <h3>Technical audit</h3>
    <table>
      <thead>
        <tr>
          <th>Check</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Meta tags</td>
          <td>OK (12/12)</td>
        </tr>
        <tr>
          <td>JSON-LD</td>
          <td>Invalid (missing comma)</td>
        </tr>
        <tr>
          <td>robots.txt</td>
          <td>OK</td>
        </tr>
        <tr>
          <td>sitemap.xml</td>
          <td>Contains invalid hash anchors</td>
        </tr>
        <tr>
          <td>OG image (share-card.png)</td>
          <td>404 - missing</td>
        </tr>
        <tr>
          <td>favicon.ico</td>
          <td>OK</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Score:</strong> 6/8 checks passed.
    </p>

    <h3>Performance (build)</h3>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>JS bundle</td>
          <td>209 KB (66 KB gzip)</td>
        </tr>
        <tr>
          <td>CSS</td>
          <td>4.6 KB (1.6 KB gzip)</td>
        </tr>
        <tr>
          <td>Total estimate</td>
          <td>~270 KB (~70 KB gzip)</td>
        </tr>
        <tr>
          <td>Modules transformed</td>
          <td>60</td>
        </tr>
      </tbody>
    </table>

    <h3>Issues identified</h3>
    <ol>
      <li>
        <strong>Broken JSON-LD</strong>: syntax error preventing Google from reading structured data
      </li>
      <li>
        <strong>Missing OG image</strong>: social media sharing without a preview image
      </li>
      <li>
        <strong>Sitemap with hash anchors</strong>: non-crawlable URLs for search engines
      </li>
      <li>
        <strong>Orphaned CSS</strong>: styles for elements that no longer exist
      </li>
      <li>
        <strong>No main tag</strong>: non-semantic HTML structure
      </li>
      <li>
        <strong>react-transition-group</strong>: heavy dependency (~15 KB) for a single animation
      </li>
    </ol>

    <hr />

    <h2>Work completed and results</h2>

    <h3>Stack modernization</h3>
    <ul>
      <li>
        Migration from custom CSS to <strong>Tailwind CSS v4</strong>
      </li>
      <li>
        Replaced <code>react-transition-group</code> with <strong>Framer Motion</strong>
      </li>
      <li>
        Created reusable components (<code>Button</code>, <code>SectionHeader</code>, <code>ScrollReveal</code>)
      </li>
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
      <li>
        Created OG image (<code>share-card.png</code>)
      </li>
      <li>Cleaned up sitemap (removed hash anchors, added lastmod)</li>
      <li>
        Added <code>&lt;main&gt;</code> for HTML semantics
      </li>
      <li>Enriched meta description with target keywords</li>
      <li>
        Added <code>og:locale</code>, <code>meta robots</code>, and absolute OG URLs
      </li>
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
        <tr>
          <th>SEO check</th>
          <th>Before</th>
          <th>After</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>JSON-LD</td>
          <td>Invalid</td>
          <td>Valid + enriched</td>
        </tr>
        <tr>
          <td>OG image</td>
          <td>404</td>
          <td>OK (1200x630)</td>
        </tr>
        <tr>
          <td>Sitemap</td>
          <td>Hash anchors</td>
          <td>Single URL + lastmod</td>
        </tr>
        <tr>
          <td>Semantic HTML</td>
          <td>No main tag</td>
          <td>main + sections</td>
        </tr>
        <tr>
          <td>Meta description</td>
          <td>Generic</td>
          <td>Targeted keywords</td>
        </tr>
        <tr>
          <td>Audit score</td>
          <td>6/8</td>
          <td>8/8</td>
        </tr>
      </tbody>
    </table>
    <p>
      The JS bundle went from 209 KB to 371 KB (66 → 116 KB gzip), and CSS from 4.6 KB to 33 KB (1.6 → 6.3 KB gzip).
      This increase reflects the addition of Framer Motion, Tailwind CSS v4, new sections (Projects, Articles), a full
      navigation system, scroll animations on every section and an in-depth article. Despite everything that was added,
      the site remains lightweight — a direct result of the optimization work done in parallel: removing unused
      dependencies, refactoring components and cleaning up orphaned CSS.
    </p>

    <hr />

    <h2>Results measured after indexing</h2>
    <p>
      The following measurements were captured about 40 days after deployment, giving Google time to recrawl and
      re-index the site. In the meantime, several copywriting iterations and a migration to Vike SSG (<code>/fr</code>{' '}
      and <code>/en</code> routes) were also applied. The numbers therefore reflect the full state of the site at the
      time of measurement.
    </p>

    <h3>Google Search Console (last 3 months)</h3>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Value (Jan 17 → Apr 17, 2026)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Impressions</td>
          <td>206</td>
        </tr>
        <tr>
          <td>Clicks</td>
          <td>2</td>
        </tr>
        <tr>
          <td>Average CTR</td>
          <td>0.97%</td>
        </tr>
        <tr>
          <td>Average position (homepage)</td>
          <td>2.32</td>
        </tr>
      </tbody>
    </table>
    <p>
      The notable spike: on April 6, the homepage recorded <strong>145 impressions at position #1</strong> in a single
      day, while the average of preceding weeks sat between 0 and 4 impressions per day. Search Console reported an
      impression increase of <strong>+7,250%</strong> on the homepage compared to the previous period — a direct effect
      of the post-fix redeployment (clean sitemap, valid JSON-LD, CDN cache purged). The Vike migration also allowed
      Google to index the <code>/fr</code> and <code>/en</code> pages in under 4 days, with the first organic click on{' '}
      <code>/fr</code> recorded as early as April 15.
    </p>

    <h3>Lighthouse audit</h3>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Desktop</th>
          <th>Mobile</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Accessibility</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <td>Best Practices</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <td>SEO</td>
          <td>92</td>
          <td>92</td>
        </tr>
      </tbody>
    </table>
    <p>
      The <strong>Performance</strong> score remains perfectible and is intentionally not displayed here. The trade-off
      was assumed: animations (Framer Motion), stack modernization (Vike SSG, Tailwind v4) and enriched content —
      including this very article — were prioritized over micro-performance optimization. Exact scores are publicly
      available on{' '}
      <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fal-si.com%2F" target="_blank" rel="noreferrer">
        PageSpeed Insights
      </a>
      . This article will be updated when these numbers improve.
    </p>

    <div className="mt-10 p-6 border border-accent/20 rounded-2xl bg-accent/[0.04] text-center">
      <p className="!mb-0 text-lg">
        <strong>Estimated project value: ~$950</strong>
      </p>
      <p className="!mb-0 !mt-2 text-sm text-[var(--color-muted)]">
        The cost of an equivalent engagement may vary depending on the initial analysis, meetings and deployment
        support.
      </p>
    </div>

    <hr />

    <h2>Conclusion</h2>
    <p>
      The biggest gains often come from the simplest fixes: valid JSON-LD, an OG image that exists, a clean sitemap.
      Modernizing the stack wasn't strictly necessary for SEO, but it improves maintainability, user experience, and
      makes it possible to iterate faster on content and conversion.
    </p>
    <p>
      Numbers summary: technical audit went from 6/8 to 8/8, the brand &ldquo;al-si.com&rdquo; now ranks #1, impressions
      grew by +7,250% on the homepage at peak, and bilingual routes were indexed in under a week. Positions on certain
      &ldquo;name + profession&rdquo; queries slightly dropped following the /fr /en migration — a temporary authority
      redistribution effect that should stabilize as Google consolidates the index.
    </p>
    <p>
      Ultimately, SEO isn't a one-shot action: it's an ongoing technical hygiene. The good news is that the most
      impactful fixes are often the simplest — you just need to measure before you touch.
    </p>

    <blockquote>
      <p>The best time to optimize a site's SEO is before launch. The second best time is now.</p>
    </blockquote>
  </>
);

export default SeoEtudeDeCas;
