export default function parseProfileData(portfolioJSONBundle) {
  
  let displayedComponents = [];

  function addComponentTypeProperty(arr, type) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].type = type
    }
    
    return arr
  }

  function getTimelineContent() {
    let contentArray = [];
    portfolioJSONBundle.timeline.content.forEach(item => {
      contentArray = contentArray.concat(addComponentTypeProperty(portfolioJSONBundle[item].content, item))
    });
    return contentArray
  }

  /* Add and configure components for display */

  if (portfolioJSONBundle?.projects) displayedComponents.push({
    category: 'Projects',
    pageRank: portfolioJSONBundle.projects.pageRank,
    content: portfolioJSONBundle.projects.content
  });

  if (portfolioJSONBundle?.accomplishments) displayedComponents.push({
    category: 'Accomplishments',
    pageRank: portfolioJSONBundle.accomplishments.pageRank,
    content: portfolioJSONBundle.accomplishments.content
  });

  if (portfolioJSONBundle?.experiences) displayedComponents.push({
    category: 'Experiences',
    pageRank: portfolioJSONBundle.experiences.pageRank,
    content: portfolioJSONBundle.experiences.content
  });

  if (portfolioJSONBundle?.education) displayedComponents.push({
    category: 'Education',
    pageRank: portfolioJSONBundle.education.pageRank,
    content: portfolioJSONBundle.education.content
  });

  /* ---------------------------- */

  if (portfolioJSONBundle?.timeline) displayedComponents.push({
    category: 'Timeline',
    pageRank: portfolioJSONBundle.timeline.pageRank,
    content: getTimelineContent()
  })

  const componentsContainingContent = displayedComponents.filter(obj => obj.content.length != 0);

  return componentsContainingContent.sort((a, b) => a.pageRank - b.pageRank);
}