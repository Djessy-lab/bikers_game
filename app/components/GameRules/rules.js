const rules = [
  {
    title: "But du jeu",
    description: "C'est un jeu collectif, pour gagner, vous devez atteindre l'arrivée ensemble après avoir aidé les bikers en galère sur les routes."
  },
  {
    title: "Comment jouer ?",
    description: "À chaque tour, vous avez trois choix :",
    steps: [
      "a) Avancer de 1 ou 2 cases maximum avec votre pion.",
      "b) Retourner une carte action face cachée et effectuer l'action de cette carte.",
      "c) Lancer le dé pour voir ce qu'il nous réserve."
    ]
  },
  {
    title: "Défis des cartes action",
    description: "Si vous réussissez le défi de votre carte action, vous pouvez poser sur le plateau une carte route au choix de votre main et ensuite vous débarrassez de cette carte action dans la défausse. Si vous vous plantez, prenez une autre carte action dans la pioche, et échangez-la avec celle que vous avez perdue sur la table face cachée."
  },
  {
    title: "Fin du tour",
    description: "À la fin du tour du premier joueur, jetez le dé et voyez le plateau se chambouler."
  },
  {
    title: "Aide aux bikers",
    description: "Hé, on n'oublie pas : avant d'atteindre la case d'arrivée, il faut passer par les cases d'aide pour aider vos amis bikers en galère et choper des pièces de motos et outils pour le garage. C'est ce qui fait de nous de vrais bikers solidaires !"
  },
  {
    title: "Cartes routes",
    description: "Si toutes les cartes routes sont posées, vous pouvez jouer des cartes actions de la pioche et échanger des routes avec les cartes routes de la pioche."
  },
  {
    title: "Cartes spéciales",
    description: 'Si vous retournez une carte "Bloqué", passez votre tour et laissez-la retournée.'
  },
  {
    title: "Aide des amis bikers",
    description: "Si vous n'avez plus de carte Route en main, vous pouvez toujours avancer grâce à l'aide de vos amis Bikers."
  },
  {
    title: "Victoire",
    description: "Et la partie est gagnée, quand tous les bikers arrivent à la ligne d'arrivée avec leurs pièces de motos récupérées. Ça, c'est la vraie victoire, les gars ! Vous avez perdu si plus aucun biker ne peut avancer ou débloquer les copains."
  }
];

export default rules;
