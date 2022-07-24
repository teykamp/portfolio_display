export default class Experience {
  constructor() {
    this.title = '',
    this.company = '',
    this.companyImg = '',
    this.description = '',
    this.date = ''
  }

  // each obj has to pass this criteria to be considered valid
  static validate(experience) {
    return Boolean(!experience)
  }
}