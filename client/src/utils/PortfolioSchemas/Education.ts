import PortfolioEntry, { ComponentType } from '../PortfolioSchemas/PortfolioEntry';

export default class Education extends PortfolioEntry {
  institution = '';
  degreeType = '';
  degreeField = '';
  type = ComponentType.EDUCATION
}