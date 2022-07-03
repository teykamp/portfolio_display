export default function parseProfileData(portfolioJSONBundle) {
  
  let output = [];

  if (portfolioJSONBundle?.projects) output.push({
    category: 'Projects',
    pageRank: portfolioJSONBundle.projects.pageRank,
    content: portfolioJSONBundle.projects.content
  });

  if (portfolioJSONBundle?.accomplishments) output.push({
    category: 'Accomplishments',
    pageRank: portfolioJSONBundle.accomplishments.pageRank,
    content: portfolioJSONBundle.accomplishments.content
  });

  if (portfolioJSONBundle?.experiences) output.push({
    category: 'Experiences',
    pageRank: portfolioJSONBundle.experiences.pageRank,
    content: portfolioJSONBundle.experiences.content
  });

  if (portfolioJSONBundle?.education) output.push({
    category: 'Education',
    pageRank: portfolioJSONBundle.education.pageRank,
    content: portfolioJSONBundle.education.content
  });

  output.sort((a, b) => b.content.pageRank - a.content.pageRank);

  return output;
}