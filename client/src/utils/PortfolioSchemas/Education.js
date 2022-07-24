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
    return education.title === 'yona'
  }
}