// Parent class to Portfolio Items such as Education, Experiences etc
export enum ComponentType {
  ACCOMPLISHMENT = 'accomplishment',
  PROJECT = 'project',
  EXPERIENCES = 'experiences',
  EDUCATION = 'education',
  UNDEFINED = 'undefined'
}

export default class PortfolioEntry {
  description = '';
  date = '';
  type = ComponentType.UNDEFINED;
}