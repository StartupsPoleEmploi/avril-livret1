export default {
  activity: [{
    label: 'En situation d\'emploi',
    value: 'working'
  }, {
    label: 'En inactivité',
    value: 'inactive',
  }, {
    label: 'En recherche d\'emploi',
    value: 'jobseeking',
  }, {
    label: 'Volontaire',
    value: 'volontary',
    isOther: true,
  }, {
    label: 'Mandat électoral',
    value: 'election',
    isOther: true,
  }],
  workingStatus: [{
    label: 'CDI',
    value: 'permanent',
  }, {
    label: 'CDD, CDD d\'usage et intérim',
    value: 'contract',
  }, {
    label: 'Travailleur indépendant, artisan, profession libérale',
    value: 'independant',
  }, {
    label: 'Fonctionnaire',
    value: 'public',
  }, {
    label: 'Militaire',
    value: 'military',
  }, {
    label: 'Contrat aidé ou contrat en alternance',
    value: 'alternance',
  }],
  subvention: [{
    label: 'Au titre de l\'assurance chômage (Allocation de retour à l\'emploi)',
    value: 'jobless',
  }, {
    label: 'Au titre du régime spécifique d\'assurance chômage des intermittents du spectacle',
    value: 'artist',
  }, {
    label: 'Je suis allocataire de minima sociaux',
    value: 'poor',
  }, {
    label: 'Je ne suis pas indemnisé',
    value: 'none',
  }]
}