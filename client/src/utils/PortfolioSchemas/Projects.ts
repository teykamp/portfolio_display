export default class Project {
  name: string;
  technologies: object[];
  linkToDeploy: string;
  linkToRepo: string;
  description: string;
  date: string

  constructor() {
    this.name = '',
    this.technologies = [],
    this.linkToDeploy = '',
    this.linkToRepo = '', 
    this.description = '',
    this.date = ''
  }

  static validate(project: Project): boolean {
    
    if (!project.name) return false
    if (project.technologies.length === 0) return false
    
    return true
  }
}