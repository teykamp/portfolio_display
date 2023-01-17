import PortfolioEntry, { ComponentType } from "../PortfolioSchemas/PortfolioEntry"

export default class Accomplishment extends PortfolioEntry {
  title = '';
  organization = '';
  type: ComponentType.ACCOMPLISHMENT = ComponentType.ACCOMPLISHMENT;
}