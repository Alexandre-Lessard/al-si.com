export const translations = {
  fr: {
    hero: {
      eyebrow: 'Concevoir · Automatiser · Faire évoluer',
      heading: ['Vos opérations méritent mieux', "qu'Excel et du copier-coller."],
      brand: 'Solutions intégrées',
      subtitle:
        "Je conçois des applications web sur mesure, j'automatise vos opérations et je connecte vos outils — du cadrage à la mise en production.",
      proofAnchor: '10+ ans en TI · Du cadrage à la production · Réponse en moins de 24 h',
      alt: 'Alexandre Lessard développeur full-stack',
      cta: {
        primary: {
          label: 'Planifier un appel découverte (30 min)',
          href: 'https://cal.com/alexandre-lessard/premier-echange-projet',
        },
        secondary: { label: 'Voir comment je travaille', href: '#how-it-works' },
        reassurance: 'Sans engagement. On clarifie votre besoin et on voit si je peux vraiment vous aider.',
      },
    },
    about: {
      title: 'À propos de moi',
      paragraphs: [
        "Développeur full-stack et administrateur réseau avec plus de dix ans d'expérience en TI. J'aide les entreprises à concevoir, automatiser et faire évoluer des applications web qui simplifient leurs opérations et soutiennent leur croissance.",
        "Mon profil hybride développement + infrastructure me permet de prendre en charge un projet du début à la fin, sans dépendre d'une équipe entière. Vous traitez avec une seule personne, qui comprend autant le code que l'environnement où il tourne.",
      ],
      audience: {
        label: 'Pour qui je travaille',
        text: 'Surtout des entreprises de services québécoises — PME, entrepreneurs et équipes en croissance qui veulent structurer leur opérationnel numérique sans monter une équipe technique interne.',
      },
      method: {
        title: 'Ma méthode',
        items: [
          "Comprendre votre métier avant d'écrire la moindre ligne de code.",
          'Proposer une solution adaptée à votre contexte, pas la plus complexe.',
          "Livrer en continu avec des points réguliers, jamais d'effet tunnel.",
          'Rester disponible après la mise en production pour les ajustements.',
        ],
      },
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
    howItWorks: {
      title: 'Comment je travaille',
      subtitle:
        'Un processus simple, transparent, sans surprise. Vous savez exactement à quoi vous attendre à chaque étape.',
      steps: [
        {
          title: 'Discussion initiale',
          text: '30 minutes pour clarifier votre besoin. Je vous dis honnêtement si je suis la bonne personne pour vous aider.',
        },
        {
          title: 'Cadrage & proposition',
          text: 'Je vous propose une approche, un échéancier et un budget transparent. Aucune mauvaise surprise.',
        },
        {
          title: 'Réalisation',
          text: "Je développe, je teste, je vous montre l'avancement régulièrement. Vous gardez le contrôle.",
        },
        {
          title: 'Mise en production & suivi',
          text: 'Je déploie, je vous forme et je reste disponible pour les ajustements et les évolutions.',
        },
      ],
    },
    proofBand: {
      title: 'Trois projets, trois besoins concrets',
      subtitle:
        'Des exemples réels du genre de mandats que je prends en charge — du site qui convertit à la plateforme SaaS en production.',
      cases: [
        {
          tag: 'Site qui convertit',
          client: 'Signé Gagné — Charpentier-menuisier',
          text: 'Site DIY GoDaddy remplacé par un vrai site codé sur stack moderne, optimisé pour Google Ads. Le client reçoit maintenant de vrais appels.',
          stack: 'Refonte · SEO · Conversion',
        },
        {
          tag: 'Plateforme SaaS en production',
          client: 'RNBP Canada',
          text: "Co-conception et développement complet d'une plateforme SaaS d'enregistrement de biens, du cadrage à la mise en production.",
          stack: 'SaaS · Cloudflare · Co-fondateur technique',
        },
        {
          tag: 'Outil métier autonome',
          client: 'Terra Indomita',
          text: "Site vitrine avec calendrier d'événements dynamique, conçu pour que le client puisse tout gérer sans intervention.",
          stack: 'Vitrine · API · Autonomie client',
        },
      ],
      footer: '10+ ans en TI · Stack moderne (React, Python, Node) · Du cadrage à la mise en production',
    },
    services: {
      title: 'Services',
      categories: [
        {
          title: 'Applications web & plateformes en ligne',
          description:
            'Pour automatiser vos processus, centraliser vos données ou offrir un service en ligne à vos clients.',
          items: [
            'Applications web sur mesure adaptées à votre métier',
            'Plateformes en ligne (SaaS) pour vos clients ou votre équipe',
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
            "Intégration d'outils IA quand c'est pertinent",
          ],
        },
        {
          title: 'Déploiement & mise en production',
          description:
            'Inclus dans chaque mandat. Vos applications sont mises en ligne, monitorées et prêtes à grandir avec vous.',
          items: [
            'Mise en production et déploiement automatisé',
            'Hébergement performant et sécurisé',
            'Monitoring et maintenance évolutive',
            'Pas un service séparé — toujours inclus',
          ],
        },
      ],
    },
    projects: {
      title: 'Projets',
      items: [
        {
          title: 'Terra Indomita',
          subtitle: "Site vitrine + calendrier d'événements pour une école de survie",
          situation:
            "École de survie qui voulait gérer son site et son calendrier d'événements en autonomie, sans dépendre d'un prestataire pour chaque mise à jour.",
          intervention:
            'Site vitrine avec calendrier dynamique connecté à Directus (REST API), déployé sur Cloudflare.',
          result: 'En production. Géré en autonomie par le client depuis des mois.',
          tags: ['JavaScript', 'Directus', 'REST API', 'Cloudflare'],
          gradient: 'bg-gradient-to-br from-green-700/20 to-green-900/10',
          image: '/terra-indomita-logo.svg',
          url: 'https://terra-indomita.ca/',
          github: 'https://github.com/Alexandre-Lessard/terra-indomita.ca',
        },
        {
          title: 'RNBP Canada',
          subtitle: "Plateforme en ligne d'enregistrement de biens de valeur",
          situation:
            "Lancer une plateforme SaaS d'enregistrement et de protection de biens de valeur, du jour 1, sans équipe technique préexistante.",
          intervention:
            "Co-conception, développement complet front et back, mise en place de l'infrastructure de production sur Cloudflare.",
          result: 'En production, utilisée par de vrais clients. Co-fondateur technique du projet.',
          tags: ['Web app', 'SaaS', 'Cloudflare'],
          image: '/rnbp-preview.png',
          url: 'https://rnbp.ca/',
          github: 'https://github.com/Alexandre-Lessard/rnbp-platform',
        },
        {
          title: 'Portfolio v2',
          subtitle: 'Refonte de mon propre site avec étude de cas SEO',
          situation: 'Mon portfolio précédent était sur un stack vieillissant, peu performant et mal référencé.',
          intervention:
            'Refonte complète sur React 19, Vite et Tailwind v4. Audit SEO méthodique, suivi documenté publiquement.',
          result: "Étude de cas SEO publique en cours. Méthodologie documentée dans l'article.",
          tags: ['React', 'Tailwind CSS', 'Vite', 'SEO'],
          image: '/share-card.jpg',
          github: 'https://github.com/Alexandre-Lessard/al-si.com',
          githubOnly: true,
        },
      ],
    },
    faq: {
      title: 'Questions fréquentes',
      items: [
        {
          question: 'Pour qui travaillez-vous typiquement?',
          answer:
            "Surtout des entreprises de services québécoises — PME, entrepreneurs et équipes en croissance. Mes mandats vont d'ajustements ponctuels de quelques heures jusqu'à des projets de plusieurs mois. Si vous hésitez parce que vous pensez être trop petit ou trop gros, écrivez quand même — c'est exactement le genre de question qu'on clarifie en 5 minutes.",
        },
        {
          question: 'Travaillez-vous seul ou en équipe?',
          answer:
            "Je travaille seul sur la grande majorité des mandats, et c'est intentionnel. Vous traitez avec une seule personne du début à la fin — je comprends votre besoin, je code, je déploie, je vous accompagne. Pas de chaîne de sous-traitants, pas de communication qui se perd. Pour les projets plus ambitieux où il faut plus de bras, je m'entoure ponctuellement de collaborateurs de confiance, sans jamais perdre le fil du projet.",
        },
        {
          question: "Et si je ne sais pas exactement ce dont j'ai besoin?",
          answer:
            "C'est souvent comme ça que les meilleurs mandats commencent. Vous me racontez votre situation, je pose les bonnes questions, et on clarifie ensemble. Mon travail commence par comprendre votre métier, pas par vous vendre une solution préfabriquée. Si après notre échange je ne suis pas la bonne personne, je vous le dirai honnêtement.",
        },
        {
          question: "Travaillez-vous avec l'IA?",
          answer:
            "Oui, quand ça apporte une vraie valeur business — automatisation intelligente, traitement de documents, assistants internes, génération de contenu structuré. Je n'utilise pas l'IA comme gadget marketing : je l'intègre quand elle résout un vrai problème pour vous, sinon je m'abstiens.",
        },
        {
          question: 'Que se passe-t-il après la mise en production?',
          answer:
            'Je ne disparais pas après la livraison. Je reste disponible pour les ajustements, les évolutions et les questions. Beaucoup de mes clients reviennent quelques mois plus tard pour faire évoluer leur outil au fur et à mesure que leur besoin change.',
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
      ],
    },
    contact: {
      title: 'Discutons de votre projet',
      paragraphs: [
        "Vous avez un projet, une idée, ou simplement un besoin que vous n'arrivez pas à formuler? On peut en discuter.",
        "Le plus simple, c'est de planifier un premier échange de 30 minutes. On clarifie votre besoin, je vous dis honnêtement si je suis la bonne personne, et on voit où ça mène — sans engagement.",
      ],
      channels: [
        {
          label: 'Planifier un appel découverte (30 min)',
          href: 'https://cal.com/alexandre-lessard/premier-echange-projet',
        },
        { label: 'Courriel', href: 'mailto:alex@al-si.com' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alexandre-lessard-3b103991/' },
        { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100094510380507' },
      ],
    },
    nav: {
      about: 'À propos',
      services: 'Services',
      projects: 'Projets',
      faq: 'FAQ',
      articles: 'Articles',
      contact: 'Contact',
    },
    footer: {
      text: 'Solutions intégrées',
    },
  },
  en: {
    hero: {
      eyebrow: 'Design · Automate · Evolve',
      heading: ['Your operations deserve better', 'than Excel and copy-paste.'],
      brand: 'Integrated Solutions',
      subtitle:
        'I build custom web applications, automate your operations and connect your tools — from scoping to production.',
      proofAnchor: '10+ years in IT · From scoping to production · Reply within 24 h',
      alt: 'Alexandre Lessard full-stack developer',
      cta: {
        primary: {
          label: 'Schedule a discovery call (30 min)',
          href: 'https://cal.com/alexandre-lessard/intro-call',
        },
        secondary: { label: 'See how I work', href: '#how-it-works' },
        reassurance: "No commitment. We clarify your need and see if I'm really the right fit.",
      },
    },
    about: {
      title: 'About Me',
      paragraphs: [
        'Full-stack developer and network administrator with over ten years of experience in IT. I help businesses design, automate and evolve web applications that simplify their operations and support their growth.',
        'My hybrid development + infrastructure profile allows me to take a project from start to finish, without depending on a full team. You deal with a single person, who understands both the code and the environment it runs in.',
      ],
      audience: {
        label: 'Who I work with',
        text: 'Mostly Quebec-based service businesses — SMBs, entrepreneurs and growing teams who want to structure their digital operations without building an internal tech team.',
      },
      method: {
        title: 'My method',
        items: [
          'Understand your business before writing a single line of code.',
          'Propose a solution that fits your context, not the most complex one.',
          'Deliver continuously with regular check-ins, never a tunnel effect.',
          'Stay available after launch for adjustments and follow-ups.',
        ],
      },
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
    howItWorks: {
      title: 'How I work',
      subtitle: 'A simple, transparent process — no surprises. You know exactly what to expect at each step.',
      steps: [
        {
          title: 'Initial discussion',
          text: "30 minutes to clarify your need. I'll tell you honestly if I'm the right person to help you.",
        },
        {
          title: 'Scoping & proposal',
          text: 'I propose an approach, a timeline and a transparent budget. No bad surprises.',
        },
        {
          title: 'Build',
          text: 'I develop, I test, I show you progress regularly. You stay in control.',
        },
        {
          title: 'Launch & follow-up',
          text: 'I deploy, train you and stay available for adjustments and future evolutions.',
        },
      ],
    },
    proofBand: {
      title: 'Three projects, three concrete needs',
      subtitle:
        'Real examples of the kind of work I take on — from a website that actually converts to a SaaS platform in production.',
      cases: [
        {
          tag: 'Website that converts',
          client: 'Signé Gagné — Carpenter',
          text: 'DIY GoDaddy site replaced by a real site built on a modern stack and optimized for Google Ads. The client now gets real calls.',
          stack: 'Redesign · SEO · Conversion',
        },
        {
          tag: 'SaaS platform in production',
          client: 'RNBP Canada',
          text: 'Co-design and full development of a SaaS platform for asset registration, from scoping to production.',
          stack: 'SaaS · Cloudflare · Technical co-founder',
        },
        {
          tag: 'Self-managed business tool',
          client: 'Terra Indomita',
          text: 'Marketing site with a dynamic event calendar, built so the client can manage everything without help.',
          stack: 'Marketing site · API · Client autonomy',
        },
      ],
      footer: '10+ years in IT · Modern stack (React, Python, Node) · From scoping to production',
    },
    services: {
      title: 'Services',
      categories: [
        {
          title: 'Web applications & online platforms',
          description:
            'To automate your processes, centralize your data, or offer an online service to your customers.',
          items: [
            'Custom web applications tailored to your business',
            'Online platforms (SaaS) for your customers or your team',
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
            'AI tools integration when it makes sense',
          ],
        },
        {
          title: 'Deployment & launch',
          description:
            'Included in every project. Your applications are deployed, monitored and ready to grow with you.',
          items: [
            'Production deployment and automation',
            'Performant and secure hosting',
            'Monitoring and ongoing maintenance',
            'Not a separate service — always included',
          ],
        },
      ],
    },
    projects: {
      title: 'Projects',
      items: [
        {
          title: 'Terra Indomita',
          subtitle: 'Marketing site + event calendar for an outdoor survival school',
          situation:
            'Outdoor survival school that wanted to manage its site and event calendar autonomously, without depending on a vendor for every update.',
          intervention:
            'Marketing site with a dynamic event calendar connected to Directus (REST API), deployed on Cloudflare.',
          result: 'Live in production. Managed autonomously by the client for months.',
          tags: ['JavaScript', 'Directus', 'REST API', 'Cloudflare'],
          gradient: 'bg-gradient-to-br from-green-700/20 to-green-900/10',
          image: '/terra-indomita-logo.svg',
          url: 'https://terra-indomita.ca/',
          github: 'https://github.com/Alexandre-Lessard/terra-indomita.ca',
        },
        {
          title: 'RNBP Canada',
          subtitle: 'Online platform for registering valuable assets',
          situation:
            'Launching a SaaS platform for registering and protecting valuable assets, from day one, with no preexisting technical team.',
          intervention: 'Co-design, full front and back development, production infrastructure setup on Cloudflare.',
          result: 'Live in production, used by real customers. Technical co-founder of the project.',
          tags: ['Web app', 'SaaS', 'Cloudflare'],
          image: '/rnbp-preview.png',
          url: 'https://rnbp.ca/',
          github: 'https://github.com/Alexandre-Lessard/rnbp-platform',
        },
        {
          title: 'Portfolio v2',
          subtitle: 'Redesign of my own site, with a public SEO case study',
          situation: 'My previous portfolio was on an aging stack, slow and poorly indexed by search engines.',
          intervention:
            'Complete redesign on React 19, Vite and Tailwind v4. Methodical SEO audit, progress documented publicly.',
          result: 'Public SEO case study in progress. Methodology already documented in the article.',
          tags: ['React', 'Tailwind CSS', 'Vite', 'SEO'],
          image: '/share-card.jpg',
          github: 'https://github.com/Alexandre-Lessard/al-si.com',
          githubOnly: true,
        },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          question: 'Who do you typically work with?',
          answer:
            "Mostly Quebec-based service businesses — SMBs, entrepreneurs and growing teams. My mandates range from a few hours of focused adjustments up to multi-month projects. If you're hesitating because you think you're too small or too big, reach out anyway — that's exactly the kind of question we sort out in 5 minutes.",
        },
        {
          question: 'Do you work solo or with a team?',
          answer:
            "I work solo on the vast majority of projects, and it's intentional. You deal with one person from start to finish — I understand your need, I write the code, I deploy, I support you. No chain of subcontractors, no communication getting lost. For more ambitious projects where extra hands are needed, I bring in trusted collaborators occasionally, without ever losing the thread.",
        },
        {
          question: "What if I don't know exactly what I need?",
          answer:
            "That's often how the best projects start. You tell me about your situation, I ask the right questions, and we clarify together. My work starts with understanding your business, not selling you a prepackaged solution. If after our call I'm not the right person, I'll tell you honestly.",
        },
        {
          question: 'Do you work with AI?',
          answer:
            "Yes, when it brings real business value — smart automation, document processing, internal assistants, structured content generation. I don't use AI as a marketing gadget: I integrate it when it solves a real problem for you, otherwise I stay out of it.",
        },
        {
          question: 'What happens after launch?',
          answer:
            "I don't disappear after delivery. I stay available for adjustments, evolutions and questions. Many of my clients come back a few months later to evolve their tool as their needs change.",
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
      ],
    },
    contact: {
      title: "Let's discuss your project",
      paragraphs: [
        "Have a project, an idea, or just a need you can't quite put into words yet? Let's talk.",
        "The easiest way is to schedule a 30-minute first call. We clarify your need, I tell you honestly whether I'm the right person, and we see where it leads — no commitment.",
      ],
      channels: [
        { label: 'Schedule a discovery call (30 min)', href: 'https://cal.com/alexandre-lessard/intro-call' },
        { label: 'Email', href: 'mailto:alex@al-si.com' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alexandre-lessard-3b103991/' },
        { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100094510380507' },
      ],
    },
    nav: {
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      faq: 'FAQ',
      articles: 'Articles',
      contact: 'Contact',
    },
    footer: {
      text: 'Integrated Solutions',
    },
  },
};
