import PortfolioEntry, { ComponentType } from "../PortfolioSchemas/PortfolioEntry";

export default class Experience extends PortfolioEntry {
  title = '';
  company = '';
  companyImg = '';
  type = ComponentType.EXPERIENCES
}