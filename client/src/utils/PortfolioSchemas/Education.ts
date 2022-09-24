import PortfolioEntry from '../PortfolioSchemas/PortfolioEntry';

export default class Education extends PortfolioEntry {
  institution: string;
  degreeType: string;
  degreeField: string;
  validate: Function;

  constructor() {
    super()
    this.institution = '',
    this.degreeType = '',
    this.degreeField = '',
    
    this.validate = (): boolean => {
      if (!this.institution) return false
      if (!this.degreeType) return false
      if (this.degreeType != 'High School') {
        if (!this.degreeField) return false
      }

      return true
    }
  }
}