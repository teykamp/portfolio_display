import Accomplishment from '../utils/PortfolioSchemas/Accomplishments'
import Project from '../utils/PortfolioSchemas/Projects'
import Experience from '../utils/PortfolioSchemas/Experiences'
import Timeline from '../utils/PortfolioSchemas/Timeline'
import Education from '../utils/PortfolioSchemas/Education'
import Header from '../utils/PortfolioSchemas/Header'
import Footer from '../utils/PortfolioSchemas/Footer'

// takes full portfolio data and returns an array of components that are invalid
export default function validatePortfolio(portfolioData) {

  let invalidComponents = []

  // validate method returns a boolean, true = valid, false = invalid
  if (portfolioData?.projects) {
    if (portfolioData.projects.content.length === 0) invalidComponents.push('projects');
    for (let i = 0; i < portfolioData.projects.content.length; i++) {
      if (!Project.validate(portfolioData.projects.content[i])) {
        invalidComponents.push('projects');
        break;
      }
    }
  }

  if (portfolioData?.education) {
    if (portfolioData.education.content.length === 0) invalidComponents.push('education');
    for (let i = 0; i < portfolioData.education.content.length; i++) {
      if (!Education.validate(portfolioData.education.content[i])) {
        invalidComponents.push('education');
        break;
      }
    }
  }

  if (portfolioData?.accomplishments) {
    if (portfolioData.accomplishments.content.length === 0) invalidComponents.push('accomplishments');
    for (let i = 0; i < portfolioData.accomplishments.content.length; i++) {
      if (!Accomplishment.validate(portfolioData.accomplishments.content[i])) {
        invalidComponents.push('accomplishments');
        break;
      }
    }
  }
  
  if (portfolioData?.experiences) {
    if (portfolioData.experiences.content.length === 0) invalidComponents.push('experiences');
    for (let i = 0; i < portfolioData.experiences.content.length; i++) {
      if (!Experience.validate(portfolioData.experiences.content[i])) {
        invalidComponents.push('experiences');
        break;
      }
    }
  }

  if (portfolioData?.timeline) {
    if (portfolioData.timeline.content.length === 0) invalidComponents.push('timeline')
    if (!Timeline.validate(portfolioData.timeline.content)) {
      invalidComponents.push('timeline')
    }
  }

  if (!Header.validate(portfolioData.header)) invalidComponents.push('header');
  if (!Footer.validate(portfolioData.footer)) invalidComponents.push('footer');


  return invalidComponents;
}