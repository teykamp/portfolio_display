<template>
  <div>
    <header :data="portfolio.header" />
    <div
      v-for="component in components" 
      :key="component"
    >
      <component 
        :is="component"
        :data="portfolio[component].content"
      />
    </div>
    <footer :data="footerData" />
  </div>
</template>

<script>
import header from '../PortfolioHeader.vue'
import footer from '../PortfolioFooter.vue'
import projects from '../SubComponents/ProjectsDisplay.vue'
import accomplishments from '../SubComponents/AccomplishmentsDisplay.vue'
import experiences from '../SubComponents/ExperiencesDisplay.vue'
import timeline from '../SubComponents/TimelineDisplay.vue'
import education from '../SubComponents/EducationDisplay.vue'

export default {
  components: {
    header,
    footer,
    projects,
    accomplishments,
    experiences,
    timeline,
    education
  },
  props: {
    portfolio: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      components: [],
      footerData: {
        disclaimer: 'Legal Disclaimer, and Stuff...',
        version: '0.1.0',
        githubSource: 'https://github.com/teykamp/portfolio_display',
        logo: 'https://avatars.githubusercontent.com/u/46391052?s=120&v=4',
      }
    }
  },
  mounted() {
    this.components = Object.keys(this.portfolio)
      .filter(component => component !== 'header');
    this.components
      .sort((a, b) => this.portfolio[a].pageRank - this.portfolio[b].pageRank);
  }
}
</script>