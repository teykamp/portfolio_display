import PortfolioEntry from "../PortfolioSchemas/PortfolioEntry";

export default class Accomplishment extends PortfolioEntry {
  title: string;
  organization: string;

  constructor() {
    super()
    this.title = '',
    this.organization = ''
  }

  // each obj has to pass this criteria to be considered valid
  static validate(accomplishment: Accomplishment): boolean {
    
    if (!accomplishment.title) return false

    return true
  }
}