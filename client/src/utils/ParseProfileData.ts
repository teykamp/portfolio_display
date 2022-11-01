import { nonStandardComponents } from '../main'

export default function parseProfileData(portfolioJSONBundle: any) {
  
  const displayedComponents = [];

  function getTimelineContent(): object[] {
    let contentArray: object[] = [];
    portfolioJSONBundle.timeline.content.forEach((item: string) => {
      contentArray = contentArray.concat(portfolioJSONBundle[item].content);
    });

    return contentArray;
  }

  /* --- Add and configure components for display --- */

  const standardComponents = Object.keys(portfolioJSONBundle).filter((comp) => {
    // components listed here will be seperated from regular format components
    // ie <comp-name>: { content: <comp-name object>[], pageRank: n }
    return !nonStandardComponents.includes(comp);
  });

  standardComponents.forEach((componentName: string) => {
    if (portfolioJSONBundle[componentName]) displayedComponents.push({
      category: componentName,
      pageRank: portfolioJSONBundle[componentName].pageRank,
      content: portfolioJSONBundle[componentName].content
    });
  });
    
  /* ---------------------------- */

  if (portfolioJSONBundle?.timeline) displayedComponents.push({
    category: 'timeline',
    pageRank: portfolioJSONBundle.timeline.pageRank,
    content: getTimelineContent()
  })

  const componentsContainingContent = displayedComponents
    .filter(obj => obj.content.length != 0);

  return componentsContainingContent.sort((a, b) => a.pageRank - b.pageRank);
}