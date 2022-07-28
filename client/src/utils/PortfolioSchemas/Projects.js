export default class Project {
  constructor() {
    this.name = '',
    this.technologies = [],
    this.linkToDeploy = '',
    this.linkToRepo = '', 
    this.description = '',
    this.date = ''
  }

  static validate(project) {
    
    if (!project.name) return false
    if (project.technologies.length === 0) return false
    
    return true
  }
}