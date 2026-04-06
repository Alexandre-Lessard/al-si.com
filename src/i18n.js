export const translations = {
  fr: {
    hero: {
      heading: ['Alexandre Lessard', 'Applications web, SaaS, automatisation & intégrations'],
      brand: 'Solutions intégrées',
      subtitle:
        "J'aide les entreprises à concevoir, automatiser et déployer des solutions web sur mesure — du cadrage initial jusqu'à la mise en production.",
      alt: 'Alexandre Lessard développeur full-stack',
      cta: {
        primary: {
          label: 'Planifier un premier échange',
          href: 'https://cal.com/alexandre-lessard/premier-echange-projet',
        },
        secondary: { label: 'Voir mes projets', href: '#projects' },
        reassurance: 'Réponse en moins de 24 h — sans engagement.',
      },
    },
    about: {
      title: 'À propos de moi',
      paragraphs: [
        "Développeur full-stack et administrateur réseau avec plus de dix ans d'expérience en TI. J'aide les entreprises à concevoir et déployer des applications web sur mesure, des plateformes SaaS, des outils internes et des automatisations qui simplifient leurs opérations.",
        "Mon profil hybride développement + infrastructure me permet de prendre en charge un projet du début à la fin : cadrage du besoin, conception, développement, déploiement et maintenance. Vous traitez avec une seule personne, qui comprend autant le code que l'environnement où il tourne.",
        "J'aborde chaque mandat avec une vision pragmatique : comprendre rapidement le besoin réel, proposer une solution adaptée à votre contexte, livrer quelque chose de fiable et facile à faire évoluer. Pas de jargon inutile, pas de surdimensionnement — juste une solution qui fonctionne.",
      ],
      recent: {
        title: 'Expérience récente',
        subtitle: 'Plateforme SaaS — secteur construction',
        text: "Dernièrement, j'ai travaillé en mode full-stack sur une plateforme SaaS destinée au domaine de la construction. J'ai contribué autant au backend (Python) qu'au frontend (React, Vite, Tailwind), en développant de nouvelles fonctionnalités, en améliorant l'architecture du système et en livrant des fonctionnalités fiables, performantes et prêtes pour la production.",
      },
      stats: [
        { value: '10+', label: "Années d'expérience en TI" },
        { value: 'Full-stack', label: "Du frontend à l'infrastructure" },
        { value: 'De A à Z', label: 'Cadrage, dev, déploiement' },
      ],
    },
    services: {
      title: 'Services',
      categories: [
        {
          title: 'Applications web & SaaS',
          description:
            'Pour automatiser vos processus, centraliser vos données ou offrir un service en ligne à vos clients.',
          items: [
            'Applications web sur mesure adaptées à votre métier',
            'Plateformes SaaS pour vos clients ou votre équipe',
            'Outils internes et tableaux de bord',
            'Interfaces modernes et performantes (React, Tailwind)',
          ],
        },
        {
          title: 'Automatisation & intégrations',
          description:
            'Pour éliminer les tâches répétitives, connecter vos outils et faire circuler vos données automatiquement.',
          items: [
            'Intégration de vos outils existants via API',
            'Automatisation de processus métier',
            'Synchronisation de données entre plateformes',
            'Scripts et services backend (Node.js, Python)',
          ],
        },
        {
          title: 'Déploiement & infrastructure',
          description:
            'Pour vous assurer que vos applications tournent vite, restent stables et sont prêtes à grandir avec vous.',
          items: [
            'Mise en production et déploiement automatisé',
            'Administration de serveurs Linux',
            'Performance, sécurité et monitoring',
            'Infrastructure réseau au besoin',
          ],
        },
      ],
    },
    projects: {
      title: 'Projets',
      items: [
        {
          title: 'Portfolio v2',
          description:
            "Refonte complète d'un portfolio sur stack moderne (React, Vite, Tailwind v4) avec optimisation SEO et performance documentée comme étude de cas publique.",
          outcome: 'Étude de cas SEO en cours — résultats publiés sous peu.',
          tags: ['React', 'Tailwind CSS', 'Vite', 'SEO'],
          image: '/share-card.png',
          github: 'https://github.com/Alexandre-Lessard/al-si.com',
          githubOnly: true,
        },
        {
          title: 'Terra Indomita',
          description:
            "Site vitrine avec calendrier d'événements dynamique pour une école de survie, conçu pour être simple à mettre à jour par le client. Frontend vanilla JS, backend Directus (REST API).",
          outcome: 'En production sur Cloudflare — autonome côté client.',
          tags: ['JavaScript', 'Directus', 'REST API', 'Cloudflare'],
          gradient: 'bg-gradient-to-br from-green-700/20 to-green-900/10',
          image: '/terra-indomita-logo.svg',
          url: 'https://terra-indomita.ca/',
          github: 'https://github.com/Alexandre-Lessard/terra-indomita.ca',
        },
        {
          title: 'RNBP Canada',
          description:
            "Plateforme SaaS permettant d'enregistrer, protéger et retrouver des biens de valeur. Co-fondateur technique et développement complet de la plateforme.",
          outcome: 'En production — co-fondateur du projet.',
          tags: ['Web app', 'SaaS', 'Cloudflare'],
          image: '/rnbp-preview.png',
          url: 'https://rnbp.ca/',
          github: 'https://github.com/Alexandre-Lessard/rnbp-platform',
        },
        {
          title: "Plugin WordPress — Gestion d'abonnements",
          description:
            "Plugin sur mesure pour la gestion des membres et abonnements d'un dojo d'arts martiaux. Interface d'administration intégrée à WordPress.",
          tags: ['WordPress', 'PHP', 'Plugin'],
          gradient: 'bg-gradient-to-br from-blue-600/15 to-transparent',
          icon: '🥋',
          comingSoon: true,
        },
      ],
    },
    testimonials: {
      title: 'Témoignages',
      items: [
        {
          quote:
            "J'avais fait mon site moi-même sur GoDaddy, puis j'avais essayé Google Ads, mais ça donnait rien — je dépensais pour rien. Alexandre a tout refait au complet : un vrai site professionnel, bien positionné sur Google, et surtout monté pour que mes publicités donnent enfin des résultats. Maintenant, quand quelqu'un clique sur mon annonce, il arrive sur quelque chose de solide et ça paraît. Je reçois des vrais appels.",
          name: 'Samuel Gagné',
          role: 'Propriétaire, Signé Gagné',
          context: 'Refonte complète de site + optimisation Google Ads — secteur construction.',
        },
        {
          quote:
            "J'avais besoin d'un site pour mon école de survie, avec un calendrier d'événements facile à gérer. Alexandre m'a monté quelque chose de propre, rapide et simple à mettre à jour. Le résultat est vraiment professionnel et ça représente bien ce que je fais. Je le recommande sans hésiter.",
          name: 'Alex Courchesne',
          role: 'Fondateur, Terra Indomita',
          context: "Site vitrine avec calendrier d'événements — école de survie.",
        },
        {
          quote:
            "Alexandre, c'est quelqu'un qui comprend vite où tu veux aller avec un projet et qui est capable de le livrer au complet. Développement, infrastructure, mise en ligne — il gère tout ça de A à Z. C'est un gars fiable, autonome et qui trouve toujours une solution.",
          name: 'Martin Gagné',
          role: 'Entrepreneur',
          context: 'Collaborateur sur plusieurs projets technologiques.',
        },
      ],
    },
    articles: {
      title: 'Articles',
      comingSoon: 'Bientôt disponible',
      items: [
        {
          title: "Optimisation SEO et performance d'un site React",
          subtitle: "Audit, modernisation du stack technique et optimisation SEO d'un portfolio développeur.",
          date: 'Mars 2026',
          excerpt:
            "Étude de cas : audit technique, modernisation du stack et optimisation SEO d'un portfolio développeur.",
          wipLabel: 'Étude en cours — résultats finaux à venir',
          slug: 'seo-etude-de-cas',
        },
        {
          title: "Apprendre Kotlin en contribuant à l'open source",
          date: 'À venir',
          excerpt:
            "Retour d'expérience sur l'apprentissage de Kotlin à travers la contribution à un mod Minecraft en Java/Kotlin.",
        },
        {
          title: 'Transformer un PC gaming en serveur NAS',
          date: 'À venir',
          excerpt:
            "Documentation du processus de conversion d'un ordinateur de gaming sous Linux en serveur NAS polyvalent.",
        },
      ],
    },
    contact: {
      title: 'Discutons de votre projet',
      paragraphs: [
        "Vous avez un projet, une idée, ou simplement un besoin que vous n'arrivez pas à formuler? On peut en discuter.",
        "Le plus simple, c'est de planifier un premier échange de 30 minutes. On clarifie votre besoin, je vous dis honnêtement si je suis la bonne personne, et on voit où ça mène — sans engagement.",
      ],
      channels: [
        { label: 'Planifier un appel', href: 'https://cal.com/alexandre-lessard/premier-echange-projet' },
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
      text: 'Solutions intégrées',
    },
  },
  en: {
    hero: {
      heading: ['Alexandre Lessard', 'Web apps, SaaS, automation & integrations'],
      brand: 'Integrated Solutions',
      subtitle:
        'I help businesses design, automate and deploy custom web solutions — from initial scoping to production.',
      alt: 'Alexandre Lessard full-stack developer',
      cta: {
        primary: {
          label: 'Schedule a first call',
          href: 'https://cal.com/alexandre-lessard/intro-call',
        },
        secondary: { label: 'View my projects', href: '#projects' },
        reassurance: 'Reply within 24 hours — no commitment.',
      },
    },
    about: {
      title: 'About Me',
      paragraphs: [
        'Full-stack developer and network administrator with over ten years of experience in IT. I help businesses design and deploy custom web applications, SaaS platforms, internal tools and automations that simplify their operations.',
        'My hybrid development + infrastructure profile allows me to take a project from start to finish: scoping the need, designing, developing, deploying and maintaining. You deal with a single person, who understands both the code and the environment it runs in.',
        'I approach every project pragmatically: quickly understanding the real need, proposing a solution that fits your context, and delivering something reliable and easy to evolve. No unnecessary jargon, no over-engineering — just a solution that works.',
      ],
      recent: {
        title: 'Recent experience',
        subtitle: 'SaaS platform — construction industry',
        text: 'Recently, I worked as a full-stack developer on a SaaS platform for the construction industry. I contributed to both the backend (Python) and frontend (React, Vite, Tailwind), building new features, improving system architecture and delivering production-ready, high-performance functionality.',
      },
      stats: [
        { value: '10+', label: 'Years of IT experience' },
        { value: 'Full-stack', label: 'From frontend to infrastructure' },
        { value: 'End-to-end', label: 'Scoping, dev, deployment' },
      ],
    },
    services: {
      title: 'Services',
      categories: [
        {
          title: 'Web applications & SaaS',
          description:
            'To automate your processes, centralize your data, or offer an online service to your customers.',
          items: [
            'Custom web applications tailored to your business',
            'SaaS platforms for your customers or your team',
            'Internal tools and dashboards',
            'Modern, performant interfaces (React, Tailwind)',
          ],
        },
        {
          title: 'Automation & integrations',
          description: 'To eliminate repetitive tasks, connect your tools and let your data flow automatically.',
          items: [
            'Integration of your existing tools via API',
            'Business process automation',
            'Data synchronization between platforms',
            'Backend scripts and services (Node.js, Python)',
          ],
        },
        {
          title: 'Deployment & infrastructure',
          description: 'To make sure your applications run fast, stay stable, and are ready to grow with you.',
          items: [
            'Production deployment and automation',
            'Linux server administration',
            'Performance, security and monitoring',
            'Network infrastructure when needed',
          ],
        },
      ],
    },
    projects: {
      title: 'Projects',
      items: [
        {
          title: 'Portfolio v2',
          description:
            'Complete redesign of a developer portfolio on a modern stack (React, Vite, Tailwind v4) with SEO and performance optimization documented as a public case study.',
          outcome: 'SEO case study in progress — final results coming soon.',
          tags: ['React', 'Tailwind CSS', 'Vite', 'SEO'],
          image: '/share-card.png',
          github: 'https://github.com/Alexandre-Lessard/al-si.com',
          githubOnly: true,
        },
        {
          title: 'Terra Indomita',
          description:
            'Marketing site with dynamic event calendar for an outdoor survival school, built to be easy for the client to update. Vanilla JS frontend, Directus backend (REST API).',
          outcome: 'Live on Cloudflare — fully autonomous client side.',
          tags: ['JavaScript', 'Directus', 'REST API', 'Cloudflare'],
          gradient: 'bg-gradient-to-br from-green-700/20 to-green-900/10',
          image: '/terra-indomita-logo.svg',
          url: 'https://terra-indomita.ca/',
          github: 'https://github.com/Alexandre-Lessard/terra-indomita.ca',
        },
        {
          title: 'RNBP Canada',
          description:
            'SaaS platform for registering, protecting and recovering valuable possessions. Technical co-founder and full development of the platform.',
          outcome: 'In production — co-founder of the project.',
          tags: ['Web app', 'SaaS', 'Cloudflare'],
          image: '/rnbp-preview.png',
          url: 'https://rnbp.ca/',
          github: 'https://github.com/Alexandre-Lessard/rnbp-platform',
        },
        {
          title: 'WordPress Plugin — Membership Management',
          description:
            'Custom plugin for member and subscription management at a local martial arts dojo. Admin interface integrated into WordPress.',
          tags: ['WordPress', 'PHP', 'Plugin'],
          gradient: 'bg-gradient-to-br from-blue-600/15 to-transparent',
          icon: '🥋',
          comingSoon: true,
        },
      ],
    },
    testimonials: {
      title: 'Testimonials',
      items: [
        {
          quote:
            "I had built my website myself on GoDaddy and tried Google Ads, but it wasn't working — I was spending money for nothing. Alexandre rebuilt everything from scratch: a professional site, well ranked on Google, and set up so my ads actually convert. Now when someone clicks my ad, they land on something solid and it shows. I'm getting real calls.",
          name: 'Samuel Gagné',
          role: 'Owner, Signé Gagné',
          context: 'Full website redesign + Google Ads optimization — construction industry.',
        },
        {
          quote:
            'I needed a website for my outdoor survival school, with an event calendar that was easy to manage. Alexandre built something clean, fast and simple to update. The result is truly professional and represents what I do perfectly. I recommend him without hesitation.',
          name: 'Alex Courchesne',
          role: 'Founder, Terra Indomita',
          context: 'Marketing site with event calendar — outdoor survival school.',
        },
        {
          quote:
            "Alexandre quickly understands where you want to go with a project and can deliver the whole thing. Development, infrastructure, deployment — he handles it all from A to Z. He's reliable, autonomous and always finds a solution.",
          name: 'Martin Gagné',
          role: 'Entrepreneur',
          context: 'Collaborator on multiple technology projects.',
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
      title: "Let's discuss your project",
      paragraphs: [
        "Have a project, an idea, or just a need you can't quite put into words yet? Let's talk.",
        "The easiest way is to schedule a 30-minute first call. We clarify your need, I tell you honestly whether I'm the right person, and we see where it leads — no commitment.",
      ],
      channels: [
        { label: 'Schedule a call', href: 'https://cal.com/alexandre-lessard/intro-call' },
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
      text: 'Integrated Solutions',
    },
  },
};
