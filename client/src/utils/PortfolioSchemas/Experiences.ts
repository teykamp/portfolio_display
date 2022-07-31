export default class Experience {
  title: string;
  company: string;
  companyImg: string;
  description: string;
  date: string;

  constructor() {
    this.title = '',
    this.company = '',
    this.companyImg = '',
    this.description = '',
    this.date = ''
  }

  // each obj has to pass this criteria to be considered valid
  static validate(experience: Experience): boolean {
    
    if (!experience.title) return false
    if (!experience.company) return false

    return true
  }
}