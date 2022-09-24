import PortfolioEntry from "../PortfolioSchemas/PortfolioEntry";

export default class Timeline extends PortfolioEntry {
  
  static validate(timeline: string[]): boolean {
    return timeline.length != 0;
  }
}