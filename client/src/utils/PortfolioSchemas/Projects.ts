import PortfolioEntry from "../PortfolioSchemas/PortfolioEntry";

export default class Project extends PortfolioEntry {
  name: string;
  technologies: object[];
  linkToDeploy: string;
  linkToRepo: string;
  validate: Function

  constructor() {
    super()
    this.name = '',
    this.technologies = [],
    this.linkToDeploy = '',
    this.linkToRepo = '',
    this.validate = (): boolean => {
      if (!this.name) return false
      if (this.technologies.length === 0) return false
    
      return true
    }
  }
}