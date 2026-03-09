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
          title: 'Plateforme SaaS construction',
          description: "Développement full-stack d'une plateforme de gestion pour le domaine de la construction. Backend Python, frontend React, Vite et Tailwind.",
          tags: ['Python', 'React', 'Vite', 'Tailwind CSS'],
          gradient: 'bg-gradient-to-br from-accent/15 to-transparent',
          icon: '🏗️'
        },
        {
          title: 'Portfolio v2',
          description: 'Site personnel avec React et Tailwind CSS v4. Optimisation SEO documentée comme étude de cas.',
          tags: ['React', 'Tailwind CSS', 'Vite', 'SEO'],
          gradient: 'bg-gradient-to-br from-blue-500/15 to-transparent',
          icon: '</>'
        },
        {
          title: 'Intégrations API & bots',
          description: "Systèmes d'intégration entre plateformes avec bots, webhooks et synchronisation automatisée.",
          tags: ['Node.js', 'REST API', 'Webhooks', 'Discord'],
          gradient: 'bg-gradient-to-br from-purple-500/15 to-transparent',
          icon: '🤖'
        },
        {
          title: 'Automatisation & déploiement',
          description: "Scripts et outils d'automatisation pour le déploiement et la maintenance de serveurs.",
          tags: ['Node.js', 'Docker', 'Ansible', 'Linux'],
          gradient: 'bg-gradient-to-br from-green-500/15 to-transparent',
          icon: '⚙️'
        },
      ],
    },
    articles: {
      title: 'Articles',
      comingSoon: 'Bientôt disponible',
      items: [
        {
          title: 'Optimisation SEO et performance d\'un site React',
          date: 'Mars 2026',
          excerpt: 'Étude de cas : audit technique, modernisation du stack et optimisation SEO d\'un portfolio développeur.',
        },
        {
          title: 'Travailler en full-stack sur une plateforme SaaS',
          date: 'À venir',
          excerpt: 'Retour d\'expérience sur le développement d\'une plateforme SaaS : architecture, choix techniques et leçons apprises.',
        },
        {
          title: 'Automatiser des processus avec Node.js',
          date: 'À venir',
          excerpt: 'Intégrations API, scripts planifiés et synchronisation de données : comment automatiser efficacement.',
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
          title: 'Construction SaaS platform',
          description: 'Full-stack development of a management platform for the construction industry. Python backend, React, Vite and Tailwind frontend.',
          tags: ['Python', 'React', 'Vite', 'Tailwind CSS'],
          gradient: 'bg-gradient-to-br from-accent/15 to-transparent',
          icon: '🏗️'
        },
        {
          title: 'Portfolio v2',
          description: 'Personal website built with React and Tailwind CSS v4. SEO optimization documented as a case study.',
          tags: ['React', 'Tailwind CSS', 'Vite', 'SEO'],
          gradient: 'bg-gradient-to-br from-blue-500/15 to-transparent',
          icon: '</>'
        },
        {
          title: 'API integrations & bots',
          description: 'Cross-platform integration systems with bots, webhooks and automated synchronization.',
          tags: ['Node.js', 'REST API', 'Webhooks', 'Discord'],
          gradient: 'bg-gradient-to-br from-purple-500/15 to-transparent',
          icon: '🤖'
        },
        {
          title: 'Automation & deployment',
          description: 'Automation scripts and tools for server deployment and maintenance.',
          tags: ['Node.js', 'Docker', 'Ansible', 'Linux'],
          gradient: 'bg-gradient-to-br from-green-500/15 to-transparent',
          icon: '⚙️'
        },
      ],
    },
    articles: {
      title: 'Articles',
      comingSoon: 'Coming soon',
      items: [
        {
          title: 'SEO & Performance Optimization for a React Site',
          date: 'March 2026',
          excerpt: 'Case study: technical audit, stack modernization and SEO optimization of a developer portfolio.',
        },
        {
          title: 'Working Full-Stack on a SaaS Platform',
          date: 'Coming soon',
          excerpt: 'Lessons learned from building a SaaS platform: architecture decisions, technical choices and takeaways.',
        },
        {
          title: 'Automating Processes with Node.js',
          date: 'Coming soon',
          excerpt: 'API integrations, scheduled scripts and data synchronization: how to automate effectively.',
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
      contact: 'Contact',
    },
    footer: {
      text: 'IT services',
    },
  },
};
