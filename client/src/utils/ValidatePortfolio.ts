import Accomplishment from '../utils/PortfolioSchemas/Accomplishments'
import Project from '../utils/PortfolioSchemas/Projects'
import Experience from '../utils/PortfolioSchemas/Experiences'
import Education from '../utils/PortfolioSchemas/Education'
import Header from '../utils/PortfolioSchemas/Header'
import Footer from '../utils/PortfolioSchemas/Footer'

// takes full portfolio data (of type object) and returns an array<string> of components that are invalid
export default function validatePortfolio(portfolioData: any) {

  const components = Object.keys(portfolioData);
  const invalidComponents: Array<string> = [];

  components.forEach((comp) => {
    if (!portfolioData[comp]?.content) return;
    else if (!portfolioData[comp].content.length) invalidComponents.push(comp);
    else portfolioData[comp].content.forEach((item: any) => {
      if (!validate(item, comp)) invalidComponents.push(comp);
    });
  });

  if (!Header.validate(portfolioData.header)) invalidComponents.push('header');
  if (!Footer.validate(portfolioData.footer)) invalidComponents.push('footer');

  return invalidComponents;
}

// validate method returns a boolean, true = valid, false = invalid
function validate(content: any, type: string): boolean {
  let isValid = true;
  switch(type) {
    case 'projects':
      isValid = Project.validate(content);
      break;
    case 'accomplishments':
      isValid = Accomplishment.validate(content);
      break;
    case 'experiences':
      isValid = Experience.validate(content);
      break;
    case 'education':
      isValid = Education.validate(content);
      break;
  }

  return isValid
}