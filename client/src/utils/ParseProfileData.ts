export default function parseProfileData(portfolioJSONBundle: any) {
  
  const displayedComponents = [];

  /* takes an array of objects and a component type and outputs the same 
  objects but with an added property with type (for adding things on timeline).
  example: input -> arr: [{title: 'SETA Cup Winner'}], type: 'accomplishments'
  output -> arr: [{title: 'SETA Cup Winner', type: 'accomplishments'}] */
  function addComponentTypeProperty(arr: any[], type: string): object[] {
    for (let i = 0; i < arr.length; i++) {
      arr[i].type = type;
    }
    
    return arr;
  }

  function getTimelineContent(): object[] {
    let contentArray: object[] = [];
    portfolioJSONBundle.timeline.content.forEach((item: string) => {
      contentArray = contentArray.concat(addComponentTypeProperty(portfolioJSONBundle[item].content, item));
    });

    return contentArray;
  }

  /* Add and configure components for display */
  const standardComponents = Object.keys(portfolioJSONBundle).filter((comp) => {
    // components listed here will be seperated from regular format components
    // ie <comp-name>: { content: <comp-name object>[], pageRank: n }
    const nonStandardComponents = ['header', 'timeline'];
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