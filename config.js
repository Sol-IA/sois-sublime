/* ═══════════════════════════════════════════════
   SOIS SUBLIME — Configuration Template
   Toutes les valeurs personnalisables en un fichier.
   Pour dupliquer le template : copier ce fichier
   et modifier les valeurs.
   ═══════════════════════════════════════════════ */

var CONFIG = {

  // ── Marque ──
  siteName: 'Sois Sublime',
  tagline: 'Coaching nutrition, beaute & bien-etre',
  coachName: 'Sandra',
  coachFullName: 'Sandra Grabielle',

  // ── URLs ──
  siteUrl: 'https://soissublime.fr',
  calendlyUrl: 'https://calendly.com/sandra-soissublime',
  calendlyDiscovery: 'https://calendly.com/sandra-soissublime/30min',
  instagramUrl: 'https://www.instagram.com/sois_sublime',
  facebookUrl: 'https://www.facebook.com/share/1AceJpnCmo/?mibextid=wwXIfr',
  youtubeUrl: 'https://youtu.be/E8e5kOz8wxo?si=vwjkTcGsVHk9sMzg',

  // ── Webhooks n8n (vide = mode mock) ──
  WEBHOOK_ESPACE: '',
  WEBHOOK_TRACKER: '',
  WEBHOOK_VERIFY: '',
  WEBHOOK_CONTACT: '',

  // ── Contact ──
  email: 'sandra.soissublime@gmail.com',
  phone: '06 12 45 29 60',
  address: '04220 Sainte-Tulle',
  siren: '83353194000025',

  // ── Programmes ──
  programs: [
    {
      id: 'diagnostic',
      name: 'Sublime Diagnostic',
      price: 39,
      priceLabel: '39\u20AC',
      duration: '30 minutes',
      shortDesc: 'Une expertise immediate sur ta problematique beaute ou vitalite.',
      description: 'Un premier RDV pour analyser ta situation et repartir avec des recommandations personnalisees et un plan d\'action concret.',
      features: [
        'Analyse ciblee de ta problematique',
        'Recommandations personnalisees',
        'Conseils alimentaires ou routine adaptes',
        'Orientation complementaire si necessaire'
      ],
      stripeLink: '',
      hasEspace: false,
      comingSoon: false
    },
    {
      id: 'reset21',
      name: 'Sublime Reset 21',
      price: 197,
      priceLabel: '197\u20AC',
      duration: '21 jours',
      shortDesc: 'Le point de depart pour relancer ta perte de poids durablement.',
      description: 'Un programme de 21 jours base sur la methode IG Bas pour reequilibrer ton alimentation, retrouver ton energie et amorcer une perte de poids durable.',
      features: [
        'Methode IG Bas complete',
        'Menus & fiches pratiques',
        'Recettes adaptees',
        '2 coachings (ouverture + cloture)',
        'Acces espace client 21 jours'
      ],
      stripeLink: '',
      hasEspace: true,
      comingSoon: false
    },
    {
      id: 'evolution',
      name: 'Sublime Evolution',
      price: 330,
      priceLabel: '330\u20AC',
      duration: '3 mois',
      shortDesc: 'Un accompagnement complet et personnalise pour transformer ta vie.',
      description: 'Trois mois d\'accompagnement sur mesure avec des menus personnalises, un suivi quotidien, des coachings reguliers et des recommandations produits adaptees a ton profil.',
      features: [
        'Tout le contenu Reset 21',
        'Menus sur mesure selon tes gouts',
        'Tracker bien-etre quotidien',
        '5 coachings individuels',
        'Recommandations produits personnalisees',
        'Comptes-rendus de coaching',
        'Acces espace client 3 mois'
      ],
      stripeLink: '',
      hasEspace: true,
      comingSoon: false
    },
    {
      id: 'sublimetoi',
      name: 'Sublime Toi',
      price: null,
      priceLabel: 'Bientot',
      duration: '6 mois',
      shortDesc: 'Le programme ultime de transformation. 6 mois pour te reinventer.',
      description: '',
      features: [],
      stripeLink: '',
      hasEspace: true,
      comingSoon: true
    }
  ],

  // ── Temoignages (reels, recuperes du site Sandra) ──
  testimonials: [
    {
      name: 'Christine D.',
      text: 'J\'ai rencontre Sandra il y a environ un an et demi. En traversant le cap des 50 ans, j\'avais besoin de retrouver confiance en moi, physiquement et mentalement. Sandra m\'a offert des conseils et des routines de beaute et de bien-etre que je continue de suivre. Je me sens plus confiante et libre.',
      program: ''
    },
    {
      name: 'Nathalie M.',
      text: 'Depuis que j\'utilise le Lumispa, le serum anti-age, le soin des yeux et du collagene chaque matin, ma routine beaute est devenue un plaisir. Mon teint est plus eclatant. J\'adore cette gamme de Sandra, qui est toujours a l\'ecoute.',
      program: ''
    },
    {
      name: 'Bernia S.',
      text: 'Sur les conseils de Sandra, j\'ai suivi une cure de 4 mois de Beauty Focus Collagene, ce qui a attenue les ridules et ameliore l\'apparence de ma peau. Ces cures m\'ont redonne vitalite physique et mentale.',
      program: ''
    },
    {
      name: 'Caroline A.',
      text: 'Apres 2 mois d\'utilisation du Dermatic Gel, ma peau est visiblement plus lisse. Sandra m\'a guidee dans le choix des bons produits pour mon type de peau.',
      program: ''
    },
    {
      name: 'Sylvie C.',
      text: 'Cela fait un an que j\'utilise le Beauty Focus Collagene et je suis tres satisfaite des resultats. Sandra sait vraiment de quoi elle parle.',
      program: ''
    },
    {
      name: 'Brigitte V.',
      text: 'Je ne peux plus me passer de ma routine LumiSpa matin et soir. C\'est devenu un rituel indispensable grace aux conseils de Sandra.',
      program: ''
    },
    {
      name: 'Marion S.',
      text: 'Un vrai moment de partage et d\'echange. Sandra est bienveillante et a l\'ecoute. Une belle rencontre humaine.',
      program: ''
    }
  ],

  // ── Methode (3 piliers) ──
  pillars: [
    {
      icon: 'leaf',
      title: 'Nutrition IG Bas',
      text: 'Une methode alimentaire basee sur l\'index glycemique bas pour perdre du poids durablement, sans frustration ni comptage de calories.'
    },
    {
      icon: 'heart',
      title: 'Beaute & Bien-etre',
      text: 'Des routines de soins et des recommandations produits pour reveler ta beaute naturelle et prendre soin de toi au quotidien.'
    },
    {
      icon: 'star',
      title: 'Accompagnement personnalise',
      text: 'Un suivi sur mesure adapte a ton rythme de vie, tes gouts et tes objectifs. Tu n\'es jamais seule dans ta transformation.'
    }
  ],

  // ── Contenus programmes (structure reelle des PDF) ──
  programContent: {
    mois1: {
      title: 'Les bases de la methode IG Bas',
      documents: [
        { type: 'fiche', title: 'Fiche mensuelle 1', file: 'Documents mois 1/FICHE MENSUELLE 1.pdf' },
        { type: 'pratique', title: 'Une journee type dans mes assiettes', file: 'Documents mois 1/Fiche pratique Une journée type dans mes assiettes.pdf' },
        { type: 'pratique', title: 'Petit-dejeuner IG Bas', file: 'Documents mois 1/Petit-déjeuner IGBA.pdf' },
        { type: 'pratique', title: 'Glucides & perte de poids', file: 'Documents mois 1/Glucides & perte de poids.pdf' },
        { type: 'pratique', title: 'Liste de courses IG Bas', file: 'Documents mois 1/Liste de Courses pour un Régime à Index Glycémique Bas.pdf' },
        { type: 'pratique', title: 'Sucrer mes boissons', file: 'Documents mois 1/Sucrer mes boissons.pdf' },
        { type: 'pratique', title: 'Idees gouters', file: 'Documents mois 1/Idées goûters.pdf' },
        { type: 'objectif', title: 'Objectif beaute du mois', file: 'Documents mois 1/Objectif beauté du mois 1.pdf' },
        { type: 'objectif', title: 'Objectif bien-etre du mois', file: 'Documents mois 1/Objectif bien être du mois 1.pdf' },
        { type: 'objectif', title: 'Objectif mouvement du mois', file: 'Documents mois 1/Objectif mouvement du mois (1).pdf' }
      ]
    },
    mois2: {
      title: 'Approfondir et ancrer les habitudes',
      documents: [
        { type: 'fiche', title: 'Fiche mensuelle 2', file: 'Documents mois 2/Fiche mensuelle 2.pdf' },
        { type: 'pratique', title: 'Le vinaigre et ses bienfaits', file: 'Documents mois 2/Fiche pratique le vinaigre mois 2.pdf' },
        { type: 'pratique', title: 'Le verre d\'eau tiede du matin', file: 'Documents mois 2/Fiche pratique le verre d\'eau tiède du matin mois 2.pdf' },
        { type: 'pratique', title: 'FAQ : le gluten et la methode IG Bas', file: 'Documents mois 2/FAQ le gluten et la méthode IGbas.pdf' },
        { type: 'objectif', title: 'Objectif beaute du mois', file: 'Documents mois 2/Objectif beauté mois 2.pdf' },
        { type: 'objectif', title: 'Objectif bien-etre du mois', file: 'Documents mois 2/Objectif bien-être mois 2.pdf' },
        { type: 'objectif', title: 'Objectif mouvement du mois', file: 'Documents mois 2/Objectif mouvement du mois 2.pdf' }
      ]
    },
    mois3: {
      title: 'Consolider et devenir autonome',
      documents: [
        { type: 'fiche', title: 'Fiche mensuelle 3', file: 'Documents mois 3/Fiche mensuelle 3.pdf' },
        { type: 'pratique', title: 'Le choix des bonnes huiles', file: 'Documents mois 3/Fiche pratique Le choix des bonnes huiles mois 3.pdf' },
        { type: 'pratique', title: 'Pourquoi ne pas compter ses calories', file: 'Documents mois 3/Fiche pratique Pqoi ne pas compter ses calories mois 3.pdf' },
        { type: 'pratique', title: 'Tout comprendre sur les proteines animales', file: 'Documents mois 3/Fiche pratique Tour comprendre sur protéines animales Mois 3.pdf' }
      ]
    }
  },

  // ── Recettes (structure reelle des PDF) ──
  recipes: [
    { id: 'r1', title: 'Porridge a IG Bas', category: 'petit-dejeuner', file: 'Recettes/Recette de Porridge à IG Bas.pdf' },
    { id: 'r2', title: 'Petit-dejeuner IG Bas sale & anti-inflammatoire', category: 'petit-dejeuner', file: 'Recettes/Idée de Petit Déjeuner IG bas Salé et anti Infl.pdf' },
    { id: 'r3', title: 'Petit-dejeuner IG Bas mixte ideal', category: 'petit-dejeuner', file: 'Recettes/Idée de Petit Déjeuner IG bas Mixte Idéal.pdf' },
    { id: 'r4', title: 'Poisson au four IG Bas', category: 'repas', file: 'Recettes/Recette IG Bas de Poisson au Four.pdf' },
    { id: 'r5', title: 'Curry de pois chiches et epinards', category: 'repas', file: 'Recettes/Recette Végétarienne à IG Bas Curry de Pois Chiches et Épinards.pdf' },
    { id: 'r6', title: 'Salade d\'ete IG Bas vegetarienne', category: 'repas', file: 'Recettes/Salade d\'Été à IG Bas végé.pdf' },
    { id: 'r7', title: 'Salade de poulet d\'ete IG Bas', category: 'repas', file: 'Recettes/Recette d\'Été IG Bas Salade de Poulet .pdf' },
    { id: 'r8', title: 'Salade de crevettes d\'ete IG Bas', category: 'repas', file: 'Recettes/Recette d\'Été IG Bas Salade de Crevettes.pdf' },
    { id: 'r9', title: 'Recette gourmande a IG Bas avec proteine', category: 'repas', file: 'Recettes/Recette Gourmande à IG Bas avec Protéine.pdf' },
    { id: 'r10', title: 'Muffins a IG Bas', category: 'gouter', file: 'Recettes/Recette de Muffins à Index Glycémique Bas.pdf' },
    { id: 'r11', title: 'Boules de cereales a IG Bas', category: 'gouter', file: 'Recettes/Recettes de Boules de Céréales à IG Bas pour le Goûter.pdf' },
    { id: 'r12', title: 'Gouters a IG Bas maison', category: 'gouter', file: 'Recettes/Recettes de Goûters à IG bas Maison.pdf' },
    { id: 'r13', title: 'Gouters IG Bas tout prets', category: 'gouter', file: 'Recettes/Idées de Goûters IG Bas tout prêts.pdf' },
    { id: 'r14', title: 'Petit-dejeuner IG Bas classique', category: 'petit-dejeuner', file: 'Recettes/Recette de Petit Déjeuner à IG Bas.pdf' },
    { id: 'r15', title: 'Apero festif a IG Bas', category: 'apero', file: 'Recettes/Recettes d\'Apéro Festif à IG Bas .pdf' },
    { id: 'r16', title: 'Vinaigre de feu', category: 'autre', file: 'Recettes/Recette du vinaigre de feu mois 2.pdf' },
    { id: 'r17', title: 'Recettes du vinaigre', category: 'autre', file: 'Recettes/Recettes du vinaigre mois 2.pdf' }
  ]
};
