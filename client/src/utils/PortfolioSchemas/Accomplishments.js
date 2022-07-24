export default class Accomplishment {
  constructor() {
    this.title = '',
    this.organization = '',
    this.description = '',
    this.date = ''
  }

  // each obj has to pass this criteria to be considered valid
  static validate(accomplishment) {
    
    if (!accomplishment.title) return false

    return true
  }
}