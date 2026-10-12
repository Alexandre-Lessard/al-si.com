export const translations = {
  fr: {
    hero: {
      eyebrow: 'Consultant en intégration de systèmes',
      heading: ['Quand votre projet', 'ne rentre dans aucune case,', "c'est là que j'interviens."],
      brand: 'Solutions intégrées',
      subtitle:
        "On m'appelle quand les logiciels d'une entreprise ne se parlent pas, quand une plateforme critique doit évoluer sans que personne ne sache comment elle a été bâtie, quand une vieille machine doit dialoguer avec des outils modernes, ou quand la solution n'existe pas sur le marché. Un besoin plus classique? Même rigueur, sans complexité inutile.",
      proofAnchor: '10+ ans en TI · Du cadrage à la production · Réponse en moins de 24 h',
      alt: 'Alexandre Lessard, consultant en intégration de systèmes',
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
        "Je suis consultant en intégration de systèmes, avec plus de dix ans en TI, en développement comme en administration de réseaux. Ma force : saisir rapidement un problème qui touche plusieurs mondes — logiciel, données, serveurs, réseau, jusqu'à l'équipement physique — et en tirer une solution qui tourne en production, mesurée et documentée.",
        "Je comprends votre réalité d'affaires avant de parler technologie. Vous traitez avec un seul interlocuteur du début à la fin : celui qui conçoit, construit et met en ligne. Et quand le besoin est plus classique — une application, un outil interne, un site —, vous profitez de la même rigueur, sans complexité inutile.",
      ],
      audience: {
        label: 'Pour qui je travaille',
        text: "Surtout des PME et des entreprises de services québécoises, avec ou sans équipe technique interne, qui ont besoin de quelqu'un capable de voir l'ensemble — du logiciel jusqu'au réseau.",
      },
      method: {
        title: 'Ma méthode',
        items: [
          "Comprendre votre réalité d'affaires avant de parler technologie.",
          "Mesurer avant d'affirmer, tester avant de recommander.",
          "Vous dire franchement ce qui ne vaut pas l'investissement.",
          'Rester disponible après la mise en production pour les ajustements.',
        ],
      },
      recent: {
        title: 'Autres mandats récents',
        items: [
          {
            title: 'Firme de courtage',
            text: 'Plateforme métier complète : site public, portails administrateur et courtier.',
          },
          {
            title: 'Logiciel de gestion pour le secteur de la construction',
            text: "Fonctionnalités et architecture, du serveur à l'interface.",
          },
        ],
      },
      stats: [
        { value: '10+', label: 'Années en TI, en développement comme en réseaux' },
        { value: '1', label: 'Seul interlocuteur, du cadrage à la mise en production' },
        { value: 'En production', label: 'Des solutions mesurées et documentées' },
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
      title: 'Quelques mandats récents',
      subtitle:
        "Des problèmes qui touchaient plusieurs mondes à la fois, réglés jusqu'en production. Les clients sont présentés sans leur nom, par discrétion.",
      cases: [
        {
          tag: 'Reprise et modernisation',
          client: 'Place de marché en ligne, en production',
          text: "Reprise du développement et de l'infrastructure d'une plateforme dont l'interface n'était plus modifiable à la source. Nouvelles fonctionnalités greffées sans y toucher, serveurs mis à niveau en pleine exploitation, reprise après sinistre testée par restauration, intégration d'un partenaire technologique européen.",
          stack: 'Reprise · Infrastructure · Intégration',
        },
        {
          tag: 'Intégration de systèmes',
          client: 'Producteur agroalimentaire',
          text: "Rapports d'inventaire branchés directement sur l'ERP, via le réseau sécurisé de l'intégrateur, pour le compte d'une firme d'intelligence d'affaires.",
          stack: 'ERP · Données · Réseau sécurisé',
        },
        {
          tag: 'Plateforme SaaS en production',
          client: 'Badge (anciennement RNBP Canada)',
          text: "Cofondateur technique d'une plateforme SaaS d'enregistrement de biens de valeur : conception, développement complet et infrastructure de production.",
          stack: 'SaaS · Cofondateur technique',
        },
        {
          tag: 'IA locale',
          client: 'Laboratoire personnel',
          text: 'Un GPU de centre de données hors support, remis en service pour des modèles de langage récents; transcription de réunions 24 fois plus rapide que le temps réel, hors nuage.',
          stack: 'IA locale · Mesures · Hors nuage',
          link: { label: "Lire l'étude de cas", href: '/fr/article/llm-modernes-tesla-k80-2014/' },
        },
      ],
      footer: '10+ ans en TI · Logiciel, données, serveurs, réseau · Du cadrage à la mise en production',
    },
    services: {
      title: 'Services',
      categories: [
        {
          title: 'Intégration de systèmes et automatisation',
          description:
            "Quand vos systèmes ont été choisis un par un et qu'aucun ne parle aux autres : je les fais travailler ensemble, de façon fiable et documentée.",
          items: [
            'Logiciels, ERP, bases de données et API branchés ensemble',
            'Rapports tirés directement de vos systèmes de gestion',
            'Intégration de partenaires et de services externes',
            'IA appliquée, hébergée chez vous quand vos données ne doivent pas sortir',
          ],
        },
        {
          title: 'Infrastructure, reprise et modernisation',
          description:
            'Quand une plateforme critique doit évoluer et que plus personne ne sait comment elle a été bâtie : je la reprends en main et je la fais évoluer, en pleine exploitation.',
          items: [
            'Reprise de systèmes existants, même sans documentation ni code source',
            "Mises à niveau de serveurs et d'infrastructure en pleine exploitation",
            'Sauvegardes et reprise après sinistre, testées par restauration',
            'Hébergement et déploiement — toujours inclus',
          ],
        },
        {
          title: 'Plateformes et applications sur mesure',
          description:
            "Quand la solution n'existe pas sur le marché : je la conçois et je la mets en production, du cadrage jusqu'à l'exploitation.",
          items: [
            'Plateformes en ligne (SaaS) et portails clients',
            'Applications métier bâties autour de votre façon de travailler',
            'Nouvelles fonctionnalités sur une plateforme existante',
            'Un besoin plus classique? Même rigueur, sans complexité inutile',
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
          title: 'Badge',
          subtitle: "Plateforme en ligne d'enregistrement de biens de valeur (anciennement RNBP Canada)",
          situation:
            "Lancer une plateforme SaaS d'enregistrement et de protection de biens de valeur, du jour 1, sans équipe technique préexistante.",
          intervention:
            "Co-conception, développement complet front et back, mise en place de l'infrastructure de production sur Cloudflare.",
          result: 'En production, utilisée par de vrais clients. Co-fondateur technique du projet.',
          tags: ['Web app', 'SaaS', 'Cloudflare'],
          image: '/rnbp-preview.png',
          url: 'https://badgeid.ca/',
          github: 'https://github.com/Alexandre-Lessard/rnbp-platform',
        },
        {
          title: "Laboratoire d'IA locale",
          subtitle: 'Un GPU de centre de données de 2014 remis en service pour des modèles de langage récents',
          situation:
            "Des machines sous-utilisées sur mon réseau, dont une Tesla K80 abandonnée par les outils modernes. L'objectif : une IA privée, hors nuage, avec le matériel déjà disponible.",
          intervention:
            "Composants compilés sous la couche des outils habituels, quatre machines réparties selon leurs forces, chaque optimisation mesurée avant d'être retenue.",
          result:
            'Des modèles de 27 à 35 milliards de paramètres servis en local, une transcription 24 fois plus rapide que le temps réel. Laboratoire personnel, documenté dans une étude de cas.',
          tags: ['IA locale', 'LLM', 'Proxmox', 'Mesures'],
          gradient: 'bg-gradient-to-br from-accent/20 to-accent/5',
          icon: 'K80',
          url: '/fr/article/llm-modernes-tesla-k80-2014/',
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
          question: 'Mon projet est-il trop simple pour vous?',
          answer:
            'Non. Une application, un outil interne, un site : la même rigueur sert les besoins classiques. Je vous propose la solution à la mesure de votre besoin, jamais plus grosse que nécessaire — et si un outil existant fait déjà le travail, je vous le dis.',
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
            "Oui, quand ça apporte une vraie valeur d'affaires — interroger vos propres documents, transcrire vos réunions, brancher un modèle de langage sur vos systèmes. Je n'utilise pas l'IA comme gadget marketing : je l'intègre quand elle résout un vrai problème pour vous, sinon je m'abstiens. Et quand vos données ne doivent pas sortir de l'entreprise, elle peut être hébergée chez vous, hors nuage.",
        },
        {
          question: 'Que se passe-t-il après la mise en production?',
          answer:
            'Je ne disparais pas après la livraison. Je reste disponible pour les ajustements, les évolutions et les questions. Beaucoup de mes clients reviennent quelques mois plus tard pour faire évoluer leur système au fur et à mesure que leur besoin change.',
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
          title: 'Faire tourner des LLM modernes sur une Tesla K80 de 2014',
          subtitle:
            "Remise en service d'une carte abandonnée par les outils modernes pour servir des modèles de 27B à 35B en local.",
          date: 'Juillet 2026',
          excerpt:
            "Retour technique sur la remise en service d'une Tesla K80 pour exécuter localement des modèles de langage modernes de 27 à 35 milliards de paramètres.",
          badge: 'Laboratoire personnel — mesures datées du 28 juillet 2026',
          author: 'Alexandre Lessard — Consultant en intégration de systèmes',
          readingTime: '24 min de lecture',
          datePublished: '2026-07-28',
          slug: 'llm-modernes-tesla-k80-2014',
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
      eyebrow: 'Systems integration consultant',
      heading: ['When your project', "doesn't fit any mold,", "that's where I come in."],
      brand: 'Integrated Solutions',
      subtitle:
        "I get the call when a company's systems don't talk to each other, when a critical platform has to evolve and nobody knows how it was built, when an old machine has to work with modern tools, or when the solution doesn't exist on the market. A more standard need? Same rigor, no needless complexity.",
      proofAnchor: '10+ years in IT · From scoping to production · Reply within 24 h',
      alt: 'Alexandre Lessard, systems integration consultant',
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
        "I'm a systems integration consultant with over ten years in IT, in development as well as network administration. My strength: quickly grasping a problem that spans several worlds — software, data, servers, networks, all the way down to physical equipment — and turning it into a solution that runs in production, measured and documented.",
        'I understand your business reality before talking technology. You deal with a single point of contact from start to finish: the person who designs, builds and launches. And when the need is more standard — an application, an internal tool, a website — you get the same rigor, without needless complexity.',
      ],
      audience: {
        label: 'Who I work with',
        text: 'Mostly Quebec SMBs and service businesses, with or without an in-house tech team, that need someone who can see the whole picture — from software down to the network.',
      },
      method: {
        title: 'My method',
        items: [
          'Understand your business reality before talking technology.',
          'Measure before claiming, test before recommending.',
          "Tell you frankly what isn't worth the investment.",
          'Stay available after launch for adjustments and follow-ups.',
        ],
      },
      recent: {
        title: 'Other recent engagements',
        items: [
          {
            title: 'Brokerage firm',
            text: 'A complete business platform: public website, administrator and broker portals.',
          },
          {
            title: 'Management software for the construction industry',
            text: 'Features and architecture, from the server to the interface.',
          },
        ],
      },
      stats: [
        { value: '10+', label: 'Years in IT, in development and networking' },
        { value: '1', label: 'Single point of contact, from scoping to production' },
        { value: 'In production', label: 'Solutions that are measured and documented' },
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
      title: 'A few recent engagements',
      subtitle:
        'Problems that spanned several worlds at once, solved all the way to production. Clients are presented without their names, for discretion.',
      cases: [
        {
          tag: 'Takeover and modernization',
          client: 'Online marketplace, in production',
          text: 'Took over development and infrastructure of a platform whose interface could no longer be modified at the source. New features grafted on without touching it, servers upgraded while in full operation, disaster recovery tested by restore, integration of a European technology partner.',
          stack: 'Takeover · Infrastructure · Integration',
        },
        {
          tag: 'Systems integration',
          client: 'Agri-food producer',
          text: "Inventory reports connected directly to the ERP, through the integrator's secure network, on behalf of a business intelligence firm.",
          stack: 'ERP · Data · Secure network',
        },
        {
          tag: 'SaaS platform in production',
          client: 'Badge (formerly RNBP Canada)',
          text: 'Technical co-founder of a SaaS platform for registering valuable assets: design, full development and production infrastructure.',
          stack: 'SaaS · Technical co-founder',
        },
        {
          tag: 'Local AI',
          client: 'Personal lab',
          text: 'An unsupported data center GPU brought back into service for recent language models; meeting transcription 24 times faster than real time, off the cloud.',
          stack: 'Local AI · Measurements · Off the cloud',
          link: { label: 'Read the case study', href: '/en/article/llm-modernes-tesla-k80-2014/' },
        },
      ],
      footer: '10+ years in IT · Software, data, servers, networks · From scoping to production',
    },
    services: {
      title: 'Services',
      categories: [
        {
          title: 'Systems integration and automation',
          description:
            'When your systems were chosen one at a time and none of them talk to each other: I make them work together, reliably and with documentation.',
          items: [
            'Software, ERPs, databases and APIs connected together',
            'Reports pulled directly from your management systems',
            'Integration of partners and external services',
            "Applied AI, hosted on your premises when your data can't leave",
          ],
        },
        {
          title: 'Infrastructure, takeover and modernization',
          description:
            'When a critical platform has to evolve and nobody knows how it was built anymore: I take it over and keep it evolving, while in full operation.',
          items: [
            'Takeover of existing systems, even without documentation or source code',
            'Server and infrastructure upgrades while in full operation',
            'Backups and disaster recovery, tested by restore',
            'Hosting and deployment — always included',
          ],
        },
        {
          title: 'Custom platforms and applications',
          description:
            "When the solution doesn't exist on the market: I design it and bring it to production, from scoping to operation.",
          items: [
            'Online platforms (SaaS) and client portals',
            'Business applications built around how you work',
            'New features on an existing platform',
            'A more standard need? Same rigor, no needless complexity',
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
          title: 'Badge',
          subtitle: 'Online platform for registering valuable assets (formerly RNBP Canada)',
          situation:
            'Launching a SaaS platform for registering and protecting valuable assets, from day one, with no preexisting technical team.',
          intervention: 'Co-design, full front and back development, production infrastructure setup on Cloudflare.',
          result: 'Live in production, used by real customers. Technical co-founder of the project.',
          tags: ['Web app', 'SaaS', 'Cloudflare'],
          image: '/rnbp-preview.png',
          url: 'https://badgeid.ca/',
          github: 'https://github.com/Alexandre-Lessard/rnbp-platform',
        },
        {
          title: 'Local AI lab',
          subtitle: 'A 2014 data center GPU brought back into service for recent language models',
          situation:
            'Underused machines on my network, including a Tesla K80 abandoned by modern tooling. The goal: private AI, off the cloud, with hardware already on hand.',
          intervention:
            'Components compiled below the usual tooling, four machines assigned by their strengths, every optimization measured before being kept.',
          result:
            'Models of 27 to 35 billion parameters served locally, transcription 24 times faster than real time. A personal lab, documented in a case study.',
          tags: ['Local AI', 'LLM', 'Proxmox', 'Measurements'],
          gradient: 'bg-gradient-to-br from-accent/20 to-accent/5',
          icon: 'K80',
          url: '/en/article/llm-modernes-tesla-k80-2014/',
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
          question: 'Is my project too simple for you?',
          answer:
            "No. An application, an internal tool, a website: the same rigor serves standard needs. I'll propose a solution sized to your need, never bigger than necessary — and if an existing tool already does the job, I'll tell you.",
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
            "Yes, when it brings real business value — searching your own documents, transcribing your meetings, connecting a language model to your systems. I don't use AI as a marketing gadget: I integrate it when it solves a real problem for you, otherwise I stay out of it. And when your data can't leave the company, it can be hosted on your premises, off the cloud.",
        },
        {
          question: 'What happens after launch?',
          answer:
            "I don't disappear after delivery. I stay available for adjustments, evolutions and questions. Many of my clients come back a few months later to evolve their system as their needs change.",
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
          title: 'Running modern LLMs on a 2014 Tesla K80',
          subtitle:
            'Bringing a card no longer supported by modern tooling back into service to serve 27B to 35B models locally.',
          date: 'July 2026',
          excerpt:
            'A technical write-up on bringing a Tesla K80 back into service to run modern language models with 27 to 35 billion parameters on local hardware.',
          badge: 'Personal lab — measurements dated July 28, 2026',
          author: 'Alexandre Lessard — Systems integration consultant',
          readingTime: '22 min read',
          datePublished: '2026-07-28',
          slug: 'llm-modernes-tesla-k80-2014',
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
