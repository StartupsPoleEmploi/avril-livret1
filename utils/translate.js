const FRA_TO_ENG = {
  identite: 'identity',
  experiences: 'experiences',
  formations: 'education',
}

const ENG_TO_FRA = {
  identity: 'identite',
  experiences: 'experiences',
  education: 'formations',
}

export const fraToEng = key => FRA_TO_ENG[key];

export const engToFra = key => ENG_TO_FRA[key]