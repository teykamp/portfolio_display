import PortfolioEntry from "../PortfolioSchemas/PortfolioEntry";

export default class Experience extends PortfolioEntry {
  title: string;
  company: string;
  companyImg: string;

  constructor() {
    super()
    this.title = '',
    this.company = '',
    this.companyImg = ''
  }

  // each obj has to pass this criteria to be considered valid
  static validate(experience: Experience): boolean {
    
    if (!experience.title) return false
    if (!experience.company) return false

    return true
  }
}