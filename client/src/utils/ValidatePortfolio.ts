import Header from '../utils/PortfolioSchemas/Header'
import Footer from '../utils/PortfolioSchemas/Footer'
import Timeline from '../utils/PortfolioSchemas/Timeline'

import { nonStandardComponents } from '../main'
import { ComponentType } from '../utils/PortfolioSchemas/PortfolioEntry'

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
      if (!validate(item)) invalidComponents.push(comp);
    });
  });

  return invalidComponents;
}

export function validate(item: any): boolean {
  
  switch (item.type) {
    case ComponentType.ACCOMPLISHMENT:
      return !!item.title
    case ComponentType.EDUCATION:
      if (!item.institution) return false
      if (!item.degreeType) return false
      if (item.degreeType != 'High School') {
        if (!item.degreeField) return false
      }
      return true
    case ComponentType.EXPERIENCES:
      if (!item.title) return false
      if (!item.company) return false
      return true
    case ComponentType.PROJECT:
      if (!item.name) return false
      if (item.technologies.length === 0) return false
      return true
    default:
      console.error('Component Type Left Undefined! ValidatePortfolio.ts', item)
      return false
  }
}