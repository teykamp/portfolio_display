import PortfolioEntry from "../PortfolioSchemas/PortfolioEntry";

export default class Experience extends PortfolioEntry {
  title: string;
  company: string;
  companyImg: string;
  validate: Function

  constructor() {
    super()
    this.title = '',
    this.company = '',
    this.companyImg = '',
    this.validate = (): boolean => {
      if (!this.title) return false
      if (!this.company) return false

      return true
    }
  }
}