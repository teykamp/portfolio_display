export default class Experience {
  constructor() {
    this.title = '',
    this.company = '',
    this.companyImg = '',
    this.description = '',
    this.date = ''
  }

  static validate(experience) {
    return experience.title === 'yona'
  }
}