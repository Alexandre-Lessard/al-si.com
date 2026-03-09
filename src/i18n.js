export const translations = {
  fr: {
    hero: {
      heading: ['Alexandre Lessard', 'Applications web, SaaS & automatisation'],
      subtitle: 'Je transforme vos besoins d\'affaires en solutions techniques concrètes.',
      alt: 'Alexandre Lessard développeur full-stack',
      cta: { primary: 'Discuter de votre projet', secondary: 'Voir mes projets' },
    },
    about: {
      title: 'À propos de moi',
      paragraphs: [
        "Développeur full-stack et administrateur réseau avec plus de dix ans d'expérience dans le domaine des technologies de l'information. Je conçois, automatise et déploie des solutions sur mesure, qu'il s'agisse d'un site web, d'un outil interne, d'une plateforme SaaS ou d'une infrastructure complète.",
        "Mon parcours en administration réseau m'a permis de bâtir des systèmes stables, sécurisés et performants, tandis que mon expérience en développement m'a appris à créer des applications efficaces et adaptées aux besoins réels des entreprises.",
        "Curieux de nature et orienté résolution de problèmes, j'élargis constamment mes compétences afin de rester efficace dans un domaine qui évolue rapidement. Cette polyvalence me permet d'aborder les projets avec une vision globale, de comprendre rapidement les besoins d'une entreprise et de concevoir des solutions techniques solides et durables.",
      ],
      recent: {
        title: 'Expérience récente',
        subtitle: 'Plateforme SaaS - secteur construction',
        text: "Dernièrement, j'ai travaillé en mode full-stack sur une plateforme SaaS destinée au domaine de la construction. J'ai contribué autant au backend (Python) qu'au frontend (React, Vite, Tailwind), en développant de nouvelles fonctionnalités, en améliorant l'architecture du système et en livrant des fonctionnalités fiables, performantes et prêtes pour la production.",
      },
      stats: [
        { value: '10+', label: "Années d'expérience en TI" },
        { value: 'Full-stack', label: 'Python, React, Node.js' },
        { value: 'SaaS', label: 'Plateformes & outils sur mesure' },
      ],
    },
    services: {
      title: 'Services',
      categories: [
        {
          title: "Applications web & SaaS",
          items: [
            'Applications web sur mesure',
            'Plateformes SaaS',
            'Outils internes et dashboards',
            'Interfaces utilisateur modernes (React, Tailwind)',
          ],
        },
        {
          title: 'Automatisation & intégrations',
          items: [
            "Intégration d'API tierces",
            "Automatisation de processus",
            "Bots, webhooks et synchronisation de données",
            "Scripts et services backend (Node.js, Python)"
          ],
        },
        {
          title: 'Déploiement & infrastructure',
          items: [
            "Déploiement et mise en production",
            "Administration de serveurs Linux",
            "Performance, sécurité et monitoring",
            "Infrastructure réseau au besoin"
          ],
        },
      ],
    },
    projects: {
      title: 'Projets',
      items: [
        {
          title: 'Portfolio v2',
          description: 'Site personnel avec React et Tailwind CSS v4. Optimisation SEO documentée comme étude de cas.',
          tags: ['React', 'Tailwind CSS', 'Vite', 'SEO'],
          image: '/share-card.png',
          github: 'https://github.com/Alexandre-Lessard/al-si.com',
          githubOnly: true,
        },
        {
          title: 'Terra Indomita',
          description: "Site vitrine avec calendrier événementiel dynamique pour une école de survie en nature. Frontend vanilla JS, backend Directus (REST API), déployé sur Cloudflare.",
          tags: ['JavaScript', 'Directus', 'REST API', 'Cloudflare'],
          gradient: 'bg-gradient-to-br from-green-700/20 to-green-900/10',
          image: '/terra-indomita-logo.svg',
          url: 'https://terra-indomita.ca/',
          github: 'https://github.com/Alexandre-Lessard/terra-indomita.ca',
        },
        {
          title: 'RNBP Canada',
          description: "Registre national des biens personnels. Plateforme permettant d'enregistrer, protéger et retrouver des biens de valeur.",
          tags: ['Web app', 'SaaS', 'Cloudflare'],
          image: '/rnbp-preview.png',
          url: 'https://rnbp.ca/',
        },
        {
          title: 'Plugin WordPress — Gestion d\'abonnements',
          description: "Plugin sur mesure pour la gestion des membres et abonnements d'un dojo d'arts martiaux. Interface d'administration intégrée à WordPress.",
          tags: ['WordPress', 'PHP', 'Plugin'],
          gradient: 'bg-gradient-to-br from-blue-600/15 to-transparent',
          icon: '🥋',
          comingSoon: true,
        },
      ],
    },
    articles: {
      title: 'Articles',
      comingSoon: 'Bientôt disponible',
      items: [
        {
          title: 'Optimisation SEO et performance d\'un site React',
          subtitle: 'Audit, modernisation du stack technique et optimisation SEO d\'un portfolio développeur.',
          date: 'Mars 2026',
          excerpt: 'Étude de cas : audit technique, modernisation du stack et optimisation SEO d\'un portfolio développeur.',
          wipLabel: 'Étude en cours — résultats finaux à venir',
          slug: 'seo-etude-de-cas',
        },
        {
          title: 'Apprendre Kotlin en contribuant à l\'open source',
          date: 'À venir',
          excerpt: 'Retour d\'expérience sur l\'apprentissage de Kotlin à travers la contribution à un mod Minecraft en Java/Kotlin.',
        },
        {
          title: 'Transformer un PC gaming en serveur NAS',
          date: 'À venir',
          excerpt: 'Documentation du processus de conversion d\'un ordinateur de gaming sous Linux en serveur NAS polyvalent.',
        },
      ],
    },
    contact: {
      title: 'Contactez-moi',
      paragraphs: [
        'Vous avez un projet d\'application, une idée de plateforme ou un besoin d\'automatisation?',
        'Discutons-en. Je réponds rapidement et peux vous accompagner de la conception au déploiement.',
      ],
      channels: [
        { label: 'Courriel', href: 'mailto:alex@al-si.com' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alexandre-lessard-3b103991/' },
        { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100094510380507' },
      ],
    },
    nav: {
      about: 'À propos',
      services: 'Services',
      projects: 'Projets',
      articles: 'Articles',
      contact: 'Contact',
    },
    footer: {
      text: 'Services informatiques',
    },
  },
  en: {
    hero: {
      heading: ['Alexandre Lessard', 'Web apps, SaaS & automation'],
      subtitle: 'I turn your business needs into concrete technical solutions.',
      alt: 'Alexandre Lessard full-stack developer',
      cta: { primary: 'Discuss your project', secondary: 'View my projects' },
    },
    about: {
      title: 'About Me',
      paragraphs: [
        "Full-stack developer and network administrator with over ten years of experience in information technology. I design, automate and deploy custom solutions, whether it's a website, an internal tool, a SaaS platform or a full infrastructure.",
        "My background in network administration taught me how to build stable, secure and high-performance systems, while my development experience allows me to create efficient applications tailored to real business needs.",
        "Curious and problem-solving oriented, I constantly expand my skills to stay effective in a fast-evolving field. This versatility gives me a global understanding of each project, helps me quickly grasp business requirements and deliver solid, reliable technical solutions.",
      ],
      recent: {
        title: 'Recent experience',
        subtitle: 'SaaS platform - construction industry',
        text: "Recently, I worked as a full-stack developer on a SaaS platform for the construction industry. I contributed to both the backend (Python) and frontend (React, Vite, Tailwind), building new features, improving system architecture and delivering production-ready, high-performance functionality.",
      },
      stats: [
        { value: '10+', label: 'Years of IT experience' },
        { value: 'Full-stack', label: 'Python, React, Node.js' },
        { value: 'SaaS', label: 'Platforms & custom tools' },
      ],
    },
    services: {
      title: 'Services',
      categories: [
        {
          title: 'Web applications & SaaS',
          items: [
            'Custom web applications',
            'SaaS platforms',
            'Internal tools and dashboards',
            'Modern user interfaces (React, Tailwind)',
          ],
        },
        {
          title: 'Automation & integrations',
          items: [
            "Third-party API integration",
            "Process automation",
            "Bots, webhooks and data synchronization",
            "Backend scripts and services (Node.js, Python)"
          ],
        },
        {
          title: 'Deployment & infrastructure',
          items: [
            "Deployment and production setup",
            "Linux server administration",
            "Performance, security and monitoring",
            "Network infrastructure when needed"
          ],
        },
      ],
    },
    projects: {
      title: 'Projects',
      items: [
        {
          title: 'Portfolio v2',
          description: 'Personal website built with React and Tailwind CSS v4. SEO optimization documented as a case study.',
          tags: ['React', 'Tailwind CSS', 'Vite', 'SEO'],
          image: '/share-card.png',
          github: 'https://github.com/Alexandre-Lessard/al-si.com',
          githubOnly: true,
        },
        {
          title: 'Terra Indomita',
          description: 'Marketing site with dynamic event calendar for an outdoor survival school. Vanilla JS frontend, Directus backend (REST API), deployed on Cloudflare.',
          tags: ['JavaScript', 'Directus', 'REST API', 'Cloudflare'],
          gradient: 'bg-gradient-to-br from-green-700/20 to-green-900/10',
          image: '/terra-indomita-logo.svg',
          url: 'https://terra-indomita.ca/',
          github: 'https://github.com/Alexandre-Lessard/terra-indomita.ca',
        },
        {
          title: 'RNBP Canada',
          description: 'National personal property registry. Platform for registering, protecting and recovering valuable possessions.',
          tags: ['Web app', 'SaaS', 'Cloudflare'],
          image: '/rnbp-preview.png',
          url: 'https://rnbp.ca/',
        },
        {
          title: 'WordPress Plugin — Membership Management',
          description: 'Custom plugin for member and subscription management at a local martial arts dojo. Admin interface integrated into WordPress.',
          tags: ['WordPress', 'PHP', 'Plugin'],
          gradient: 'bg-gradient-to-br from-blue-600/15 to-transparent',
          icon: '🥋',
          comingSoon: true,
        },
      ],
    },
    articles: {
      title: 'Articles',
      comingSoon: 'Coming soon',
      items: [
        {
          title: 'SEO & Performance Optimization for a React Site',
          subtitle: 'Audit, technical stack modernization and SEO optimization of a developer portfolio.',
          date: 'March 2026',
          excerpt: 'Case study: technical audit, stack modernization and SEO optimization of a developer portfolio.',
          wipLabel: 'Ongoing study — final results coming soon',
          slug: 'seo-etude-de-cas',
        },
        {
          title: 'Learning Kotlin Through Open Source Contributions',
          date: 'Coming soon',
          excerpt: 'Experience report on learning Kotlin by contributing to a Minecraft mod built with Java/Kotlin.',
        },
        {
          title: 'Turning a Gaming PC Into a NAS Server',
          date: 'Coming soon',
          excerpt: 'Documenting the process of converting a Linux gaming PC into a versatile NAS and gaming server.',
        },
      ],
    },
    contact: {
      title: 'Contact Me',
      paragraphs: [
        'Have a project, a platform idea or an automation need?',
        'Let\'s talk. I reply quickly and can guide you from design to deployment.',
      ],
      channels: [
        { label: 'Email', href: 'mailto:alex@al-si.com' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alexandre-lessard-3b103991/' },
        { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100094510380507' },
      ],
    },
    nav: {
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      articles: 'Articles',
      contact: 'Contact',
    },
    footer: {
      text: 'IT services',
    },
  },
};
