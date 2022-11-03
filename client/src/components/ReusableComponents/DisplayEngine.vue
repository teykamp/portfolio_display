<template>
  <div>
    <Header :data="portfolio.header" />
    <div
      v-for="component in components" 
      :key="component"
    >
      <div>
        {{ portfolio[component] }}
      </div>
    </div>
    <Footer :data="footerData" />
  </div>
</template>

<script>
import Header from '../PortfolioHeader.vue'
import Footer from '../PortfolioFooter.vue'
// import Projects from '../SubComponents/ProjectsDisplay.vue'
// import Accomplishments from '../SubComponents/AccomplishmentsDisplay.vue'
// import Experiences from '../SubComponents/ExperiencesDisplay.vue'
// import Timeline from '../SubComponents/TimelineDisplay.vue'
// import Education from '../SubComponents/EducationDisplay.vue'

export default {
  components: {
    Header,
    Footer,
    // Projects,
    // Accomplishments,
    // Experiences,
    // Timeline,
    // Education
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
    this.components = Object.keys(this.portfolio).filter(component => component !== 'header');
    this.components.sort((a, b) => this.portfolio[a].pageRank - this.portfolio[b].pageRank)
  }
}
</script>