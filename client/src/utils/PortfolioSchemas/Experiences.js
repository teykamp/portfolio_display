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
    
    if (!experience.title) return false
    if (!experience.company) return false

    return true
  }
}