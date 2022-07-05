export default function parseProfileData(portfolioJSONBundle) {
  
  let displayedComponents = [];

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

  

  return displayedComponents.sort((a, b) => a.pageRank - b.pageRank);
}