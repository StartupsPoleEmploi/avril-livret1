export default {
  status: [{
    label: 'situation d\'emploi',
    value: 'working'
  }, {
    label: 'inactivité',
    value: 'inactive',
  }, {
    label: 'recherche d\'emploi',
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
  employmentType: [{
    label: 'CDI',
    value: 'permanent',
  }, {
    label: 'CDD, CDD d\'usage et intérim',
    value: 'contract',
  }, {
    label: 'travailleur indépendant, artisan, profession libérale',
    value: 'independant',
  }, {
    label: 'fonctionnaire',
    value: 'public',
  }, {
    label: 'militaire',
    value: 'military',
  }, {
    label: 'contrat aidé ou contrat en alternance',
    value: 'alternance',
  }],
  compensationType: [{
    label: 'au titre de l\'assurance chômage (Allocation de retour à l\'emploi)',
    value: 'jobless',
  }, {
    label: 'au titre du régime spécifique d\'assurance chômage des intermittents du spectacle',
    value: 'artist',
  }, {
    label: 'je suis allocataire de minima sociaux',
    value: 'poor',
  }, {
    label: 'je ne suis pas indemnisé',
    value: 'none',
  }]
}