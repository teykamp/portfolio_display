import PortfolioEntry from "../PortfolioSchemas/PortfolioEntry"

// logo to be removed (GitHub issue #185)
interface Tech {
  logo: string,
  name: string
}

export default class Project extends PortfolioEntry {
  name: string;
  technologies: Array<Tech>;
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