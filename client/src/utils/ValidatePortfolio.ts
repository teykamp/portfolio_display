import Header from '../utils/PortfolioSchemas/Header'
import Footer from '../utils/PortfolioSchemas/Footer'
import Timeline from '../utils/PortfolioSchemas/Timeline';

import { nonStandardComponents } from '../main'

// takes full portfolio data (of type object) and returns an array<string> of components that are invalid
export default function validatePortfolio(portfolioData: any) {

  const components = Object.keys(portfolioData);
  const invalidComponents: Array<string> = [];

  if (portfolioData?.timeline) {
    if (!Timeline.validate(portfolioData.timeline.content)) invalidComponents.push('timeline')
  }
  if (!Header.validate(portfolioData.header)) invalidComponents.push('header');
  if (!Footer.validate(portfolioData.footer)) invalidComponents.push('footer');

  components.forEach((comp) => {
    if (nonStandardComponents.includes(comp)) return;
    else if (!portfolioData[comp].content.length) invalidComponents.push(comp);
    else portfolioData[comp].content.forEach((item: any) => {
      if (!item.validate()) invalidComponents.push(comp);
    });
  });

  return invalidComponents;
}