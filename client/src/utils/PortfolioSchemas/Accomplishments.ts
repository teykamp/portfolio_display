export default class Accomplishment {
  title: string;
  organization: string;
  description: string;
  date: string;

  constructor() {
    this.title = '',
    this.organization = '',
    this.description = '',
    this.date = ''
  }

  // each obj has to pass this criteria to be considered valid
  static validate(accomplishment: Accomplishment): boolean {
    
    if (!accomplishment.title) return false

    return true
  }
}