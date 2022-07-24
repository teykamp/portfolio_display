export default class Education {
  constructor() {
    this.institution = '',
    this.degreeType = '',
    this.degreeField = '',
    this.description = '',
    this.date = ''
  }

  // each obj has to pass this criteria to be considered valid
  static validate(education) {
    
    if (!education.institution) return false
    if (!education.degreeType) return false
    if (education.degreeType != 'High School') {
      if (!education.degreeField) return false
    }

    return true
  }
}