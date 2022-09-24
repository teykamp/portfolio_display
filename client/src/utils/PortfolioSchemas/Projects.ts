import PortfolioEntry from "../PortfolioSchemas/PortfolioEntry";

export default class Project extends PortfolioEntry {
  name: string;
  technologies: object[];
  linkToDeploy: string;
  linkToRepo: string;

  constructor() {
    super()
    this.name = '',
    this.technologies = [],
    this.linkToDeploy = '',
    this.linkToRepo = ''
  }

  static validate(project: Project): boolean {
    
    if (!project.name) return false
    if (project.technologies.length === 0) return false
    
    return true
  }
}