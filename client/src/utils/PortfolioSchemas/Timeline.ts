import PortfolioEntry from "../PortfolioSchemas/PortfolioEntry";

export default class Timeline extends PortfolioEntry {
  validate: Function;

  constructor() {
    super()
    this.validate = (): boolean => {
      // add validation here
      return true
    }
  }
}