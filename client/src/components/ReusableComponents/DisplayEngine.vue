<template>
  <div v-if="isPortfolioValid && timelineReady">
    <div class="action-bar">
      <slot name="actions" />
    </div>
    <Header :data="mutatedPortfolio.header" />
    <div
      v-for="component in components" 
      :key="component"
    >
      <component 
        :is="component"
        :data="mutatedPortfolio[component].content"
      />
    </div>
    <Footer :data="footerData" />
  </div>
</template>

<script>
import Header from '../PortfolioHeader.vue'
import Footer from '../PortfolioFooter.vue'
import projects from '../SubComponents/ProjectsDisplay.vue'
import accomplishments from '../SubComponents/AccomplishmentsDisplay.vue'
import experiences from '../SubComponents/ExperiencesDisplay.vue'
import timeline from '../SubComponents/TimelineDisplay.vue'
import education from '../SubComponents/EducationDisplay.vue'

export default {
  components: {
    Header,
    Footer,
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
      mutatedPortfolio: {},
      // makes sure that timeline has content property before rendering components
      timelineReady: false,
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
    this.entryPoint();
  },
  computed: {
    isPortfolioValid() {
      if (typeof this.mutatedPortfolio !== 'object') return false;
      if (!this.mutatedPortfolio?.header) return false;
      return true;
    }
  },
  methods: {
    entryPoint() {
      // creates deep copy for us to mutate
      this.mutatedPortfolio = JSON.parse(JSON.stringify(this.portfolio));
      if (this.isPortfolioValid) {
        this.buildDisplay();
      }
    },
    buildDisplay() {
      if (this.mutatedPortfolio?.timeline) {
        this.configureTimeline();
      } else {
        this.timelineReady = true;
      }

      this.components = Object.keys(this.portfolio)
        .filter(component => component !== 'header')
        .sort((a, b) => this.portfolio[a].pageRank - this.portfolio[b].pageRank);
    },
    configureTimeline() {
      let timelineEntries = [];
      this.portfolio.timeline.content.forEach(componentInTimeline => {
        timelineEntries = timelineEntries
          .concat(this.portfolio[componentInTimeline].content);
      })
      this.mutatedPortfolio.timeline.content = timelineEntries;
      this.timelineReady = true;
    }
  },
  watch: {
    portfolio: {
      deep: true,
      handler() {
        this.entryPoint();
      }
    }
  }
}
</script>

<style scoped>
.action-bar {
  position: fixed; 
  top: 0; 
  z-index: 999; 
  width: 100%; 
  background-color: rgba(0, 0, 0, 0.25)
}
</style>