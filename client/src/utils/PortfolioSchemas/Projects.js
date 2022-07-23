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
    return project.name === 'yona'
  }
}