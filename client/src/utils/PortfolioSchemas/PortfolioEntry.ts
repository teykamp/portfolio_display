
// Parent class to Portfolio Items such as Education, Experiences etc

export default class PortfolioEntry {
  description: string;
  date: string;

  constructor() {
    this.description = '',
    this.date = ''
  }
}