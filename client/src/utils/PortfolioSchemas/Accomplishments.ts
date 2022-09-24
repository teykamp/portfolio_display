import PortfolioEntry from "../PortfolioSchemas/PortfolioEntry";

export default class Accomplishment extends PortfolioEntry {
  title: string;
  organization: string;
  validate: Function

  constructor() {
    super()
    this.title = '',
    this.organization = '',
    this.validate = (): boolean => {
      if (!this.title) return false

      return true
    }
  }
}