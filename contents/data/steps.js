export default [
  {
    store: "education",
    path: "formations",
    steps: [
      {
        label: "Dernière formation",
        to: "/formations"
      },
      {
        label: "Niveau",
        to: "/formations/diplome"
      },
      {
        label: "Diplôme(s)",
        to: "/formations/rncp"
      },
      {
        label: "Formations",
        to: "/formations/formations"
      }
    ]
  },
  {
    store: "experiences",
    path: "experiences",
    steps: [
      {
        label: "Mes expériences professionnelles",
        to: "/experiences",
        hidden: true
      },
      {
        label: "Fonction",
        to: "/experiences/fonction"
      },
      {
        label: "Famille pro",
        to: "/experiences/famille"
      },
      {
        label: "Statut",
        to: "/experiences/statut"
      },
      {
        label: "Activités",
        to: "/experiences/precision"
      },
      {
        label: "Période",
        to: "/experiences/periode"
      },
    ]
  },
  {
    store: "identity",
    path: "identite",
    steps: [
      {
        label: "Lieu de résidence",
        to: "/identite"
      },
      {
        label: "Naissance",
        to: "/identite/naissance"
      },
      {
        label: "Identité",
        to: "/identite/identite"
      }
    ]
  }
]