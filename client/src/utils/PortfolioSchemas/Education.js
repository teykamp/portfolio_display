export default class Education {
  constructor() {
    this.institution = '',
    this.degreeType = '',
    this.degreeField = '',
    this.description = '',
    this.date = ''
  }

  static validate(education) {
    return education.title === 'yona'
  }
}