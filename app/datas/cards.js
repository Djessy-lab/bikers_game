const cards = [
  {
    category: 'Les bikers au grand coeur',
    action: 'Fais un compliment sincère à chaque biker autour de toi.'
  },
  {
    category: 'Pleins gaz !!!',
    description: 'Un biker peut toujours compter sur son équipe.',
    action: 'Lève toi avec le ou la biker à ta droite et met toi de dos devant lui ou elle. Laisse toi tomber en arrière.',
    chrono: 60
  },
  {
    category: 'Joue comme un vrai biker',
    description: 'Le ou la biker à ta droite vient de louper la sortie pour vous rejoindre. Il ou elle est couvert(e) de honte.',
    action: 'Déguise toi en biker et va le ou la réconforter.',
    chrono: 110
  },
  {
    category: 'Le coeur du biker',
    description: "Deux motardes se font des bisous sur l'air d'autoroute. Mais certaines personnes se moquent d'elles.",
    question: " Comment s'appelle cette situation ?",
    answers: [{ label: 'Homophobie', value: true }, { label: 'Loi de la jungle', value: false }, { label: 'Racisme', value: false }],
  },
  {
    category: 'Joue comme un vrai biker',
    description: 'Place le ou la biker de ton choix debout devant toi.',
    action: "Sculpte l'autre biker pour lui donner une position de héros. Si il ou elle se sent confiant(e), c'est gagné.",
    chrono: 60
  },
  {
    category: 'Fais tourner le moteur',
    question: 'Le harcèlement est puni par la loi !',
    answers: [{ label: 'Faux', value: false }, { label: 'Vrai', value: true }],
  },
  {
    category: "À 100 à l'heure",
    description: "Gaston le mouton s'est fait teindre sa laine en violet et certains autres se moquent de lui.",
    action: "Éxplique à Gaston pourquoi c'est cool de ne pas être comme tout le monde. Si tu arrive à convaincre ton équipe, c'est gagné.",
    chrono: 60
  },
  {
    category: "Pleins gaz !!!",
    action: "Cite les 3 personnes à qui tu fais le plus confiance et qui pourront toujours t'aider en cas de problèmes.",
    chrono: 30
  },
  {
    category: 'Les bikers au grand coeur',
    action: 'Cite 3 émotions que peut ressentir un biker exclu du groupe de motos.',
    chrono: 30
  },
  {
    category: 'Trace ton chemin',
    description: "Choisis un camarade pour faire un dessin les yeux fermés. Tu vas lui dire quoi dessiner, mais sans dire le mot exact. Si tu dis le mot, c'est perdu. Si ton camarade devine le mot, c'est gagné.",
    action: "CHUT LIS DANS TA TÊTE ! Fais lui dessiner : un vélo",
    chrono: 60
  },
  {
    category: "Gros bouchons (d'oreilles)",
    description: "Tous les bikers doivent aller au bout de la pièce et boucher leurs oreilles pour lire sur tes lèvres.",
    action: "CHUT LIS DANS TA TÊTE ! Chuchote le mot : Bécane",
    chrono: 60
  },
  {
    category: 'Pleins gaz !!!',
    description: 'Tes camarades bikers mettent un mot sur un post-it et le collent sur ton front.',
    action: "Tu dois deviner ce mot. Tes coéquipiers ne peuvent répondre que par oui ou par non.",
    chrono: 180
  },
  {
    category: 'Éteignez les moteurs !',
    description: 'Tu vas devoir faire deviner un mot mais 3 mots sont interdits.',
    action: "CHUT LIS DANS TA TÊTE ! Le mot est : défendre. Attention tu ne peux pas utiliser : Seul, Isolé, Ignorer",
    chrono: 60
  },
  {
    category: 'Trace ton chemin',
    description: "Tu vas devoir faire deviner un mot en le dessinant dans le dos d'un autre biker.",
    action: "CHUT LIS DANS TA TÊTE ! Dessine le mot : AIDER"
  },
  {
    category: "À 100 à l'heure",
    description: "Tu t'es fait voler ton goûter. Les autres bikers peuvent te réconforter en t'offrant 1 de leur cartes 'route'.",
    action: "Si personne ne t'a offert de carte, tu dois passer ton tour."
  },
  {
    category: "À 100 à l'heure",
    description: "La personne à ta droite doit aller changer 3 choses sur elle (maquillage, vêtements, grimaces, accessoires...).",
    action: "Retrouve ce qu'elle à modifié. Attention tu dois tout trouver !",
    chrono: 60
  },
  {
    category: 'Joue comme un vrai biker',
    description: 'Le memebre le plus jeune des bikers vient de tomber de sa moto. Pointez le du doigt et moquez vous de lui.',
    action: 'Puis allez voir la réponse C1 pour savoir qui gagne.',
  },
  {
    category: 'Les bikers au grand coeur',
    description: "Tu dois réconforter un autre biker en inventant une chanson avec le mot 'BIKER' et 'GRAND COEUR'.",
    action: "Si la chanson rime, tu peux pivoter la dernière carte jouée à 90°",
    chrono: 20
  },
  {
    category: 'Fais tourner le moteur',
    description: "Ta copine Hélène la Hyène comme à faire des siennes et à faire régner sa loi dans l'équipe.",
    question: "Que ferais-tu ? (1 réponse ou +)",
    answers: [{ label: "Demander à la cheffe motarde d'en discuter avec elle", value: false }, { label: 'Écouter son point de vu et faire entendre le tien pour calmer la situation.', value: true }, { label: "L'exlure", value: false }],
  },
  {
    category: 'Tombe pas de ta bécane',
    description: "Prend 3 papiers brouillon. Écris un mot méchant sur chacun, roule les en boule. Mets-toi à 3 pas d'une poubelle.",
    action: "Jette-les (tu as 3 essais). Si une boulette atteint la poubelle, tu gagnes !"
  },
  {
    category: 'Trace ton chemin',
    description: "Tous les bikers son conviés a se dessiner en héros/héroïne avec un super pouvoir sur la même feuille.",
    action: "Si tous les héros sont dessinés c'est validé tu peux poser une carte Route.",
    chrono: 60
  },
  {
    category: 'Pleins gaz !!!',
    description: "Récitez les 26 lettres de l'alphabet ensemble. Chaque biker donne une lettre à tour de rôle. ",
    action: "Attention ! Il ne faut pas vous couper la parole. Vous disposez d'un seul essai.",
    chrono: 25
  },
  {
    category: "À 100 à l'heure",
    description: "Trouve 3 objets dans cette pièce qui commence par la première lettre de ces 3 mots :",
    action: "Violence, Témoin, Dialogue",
    chrono: 60
  },
  {
    category: 'Les bikers au grand coeur',
    action: "Pense à une chose qui t'énerve. Va dehors ou dans une pièce adaptée et pousse un grand cri. Dis aux autres bikers comment tu t'es senti(e).",
    chrono: 60
  },
  {
    category: "Fais tourner le moteur",
    description: "Tu vas devoir faire deviner un mot mais 3 mots sont interdits.",
    action: "CHUT LIS DANS TA TÊTE ! Le mot est : défendre. Attention tu ne peux pas utiliser : Aider, Sauver, Taper",
    chrono: 60
  },
  {
    category: "Le code du biker",
    description: "Clara Capybara va se plaindre à la cheffe motarde. Léon Lion et sa flotte se moquent d'elle.",
    question: "Clara est-elle une balance ?",
    answers: [{ label: "Oui cette grosse poucave", value: false }, { label: "Non, elle a bien agi", value: true }, { label: "Elle aurait dû ne pas s'en mêler", value: false }],
    chrono: 20
  },
  {
    category: "À 100 à l'heure",
    action: "Attrape autour de toi un objet qui réconforte, un objet qui fait mal et un objet qui réconcilie",
    chrono: 90
  },
  {
    category: "Joue comme un vrai biker",
    description: "Tu vas devoir faire deviner un mot en le mimant.",
    action: "CHUT LIS DANS TA TÊTE ! Le mot est : Héros",
    chrono: 60
  },
  {
    category: "Trace ton chemin",
    action: "Dessine 3 objets qui te rendent plus fort(e).",
    chrono: 60
  },
  {
    category: "À 100 à l'heure",
    action: "Attrape un objet qui protège autour de toi.",
    chrono: 60
  },
  {
    category: "Joue comme un vrai biker",
    action: "Tu dois faire 3 tours autour de la table comme si tu faisait de la moto à 100 à l'heure !",
    chrono: 60
  },
  {
    category: "Joue comme un vrai biker",
    description: "Tu vas devoir mimer une action et la faire deviner.",
    action: "CHUT LIS DANS TA TÊTE ! Mime : SE MOQUER",
    chrono: 60
  },
  {
    category: "Gros bouchons (d'oreilles)",
    description: "Tous les bikers doivent aller au bout de la pièce et boucher leurs oreilles pour lire sur tes lèvres.",
    action: "CHUT LIS DANS TA TÊTE ! Chuchote le mot : Dépannage",
    chrono: 60
  },
  {
    category: 'Fais tourner le moteur',
    question: "En moyenne combien de personnes sont victime de harcèlement au collège ?",
    answers: [{ label: "15%", value: true }, { label: '1%', value: false }, { label: "5%", value: false }],
    chrono: 30
  },
  {
    category: "Le code du biker",
    question: "Laquelle de ces affirmations est vraie ?",
    answers: [{ label: "Les vrais motards n'abandonnent jamais les autres sur la route", value: true }, { label: "Les vrais motards n'écoutent jamais Ariana Grande", value: false }],
    chrono: 30
  },
  {
    category: "Le code du biker",
    question: "Le harcèlement c'est quand tu embête quelqu'un :",
    answers: [{ label: "... pour le ou la faire rire", value: false }, { label: "... quand tu es fâché(e)", value: false }, { label: "... à répétition", value: true }],
    chrono: 30
  },
]

export default cards;
