<template>
  <div class="background-matte center">
    <div class="background-fade"></div>
    <div class="content-container pl-10">
      <div :style="`width: ${sm ? '100':'70'}%`">
        <h1 :class="`title text-${sm ? 'h3':'h1'}`">
          <span 
            :style="popoutColorDisplay"
            class="popout" 
          >Popout</span> Portfolio
        </h1>
        <p 
          :class="`text-${sm ? 'h5':'h3'}`" 
          style="font-weight: 200; cursor: default"
        >
          Create a portfolio on the cloud that 
          <span @mouseover="playHighlightAnimation"
              :style="`${highlightAnimation}; height: ${sm ? '35':'50'}px;`"
              class="highlight">
            stands out.
          </span>
          100% for free
        </p>
      </div>
      <img
        v-if="!sm"
        src="../../assets/LandingPage/notepad.png"
        alt="portfolio"
        style="mix-blend-mode: darken; width: 25%"
      />
    </div>
    <img
      v-if="sm"
      src="../../assets/LandingPage/notepad.png"
      alt="portfolio"
      style="mix-blend-mode: darken; opacity: 0.1; min-width: 550px"
    />
    <div 
      @click.stop="$emit('updateCurrentSection', 'build')"
      class="bottom-text"
    >
      <p 
        class="text-p" 
        style="font-size: 20pt; font-weight: 200; margin: 0%"
      >
        learn about how
      </p>
      <v-icon
        x-large 
        class="down-chevron ml-1"
        style="opacity: 0.8"
      >
        mdi-chevron-down
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      highlightWidth: 0,
      highlightAnimationPlaying: false,
      popoutColor: 'black',
      popoutColors: [
        'red',
        'blue',
        'green',
        'orange',
        '#294DCD',
        'brown',
        'purple'      
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.popoutColor = '#294DCD';
    }, 10)
    this.popoutColorChange = setInterval(() => {
      const INX = this.popoutColors.indexOf(this.popoutColor);
      const LAST_COLOR = INX === this.popoutColors.length - 1;
      this.popoutColor = LAST_COLOR ? this.popoutColors[0] : this.popoutColors[INX + 1];
    }, 2000)

    setTimeout(() => {
      this.playHighlightAnimation();
    }, 1000)
  },
  destroyed() {
    clearInterval(this.popoutColorChange);
  },
  computed: {
    popoutColorDisplay() {
      return `color: ${this.popoutColor}`;
    },
    highlightAnimation() {
      return `background: linear-gradient(to right, #294DCD33 ${this.highlightWidth}%, 0%, transparent);`
    },
    sm() {
      return !this.$vuetify.breakpoint.mdAndUp;
    }
  },
  methods: {
    playHighlightAnimation() {
      if (this.highlightAnimationPlaying) return;
      this.highlightWidth = 0;
      const TRANSITION_DUR = 6;

      // 100 represents percentage

      this.highlightAnimationPlaying = true;
      setTimeout(() => {
        this.highlightAnimationPlaying = false;
      // final transition dur in ms = HIGHLIGHT_WIDTH * TRANSITION_DUR
      }, TRANSITION_DUR * 100)

      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          this.highlightWidth++
        }, i * TRANSITION_DUR)
      }
    }
  }
}
</script>

<style scoped>
.background-fade {
  position: absolute;
  top: 0;
  width: 100%;
  height: 55%;
  background: linear-gradient(180deg, #294DCD 0%, rgba(53, 69, 205, 0.61) 22.57%, rgba(93, 41, 205, 0.00990103) 100%);
}
.background-matte {
  width: 100vw;
  height: 100vh;
  background: white;
  position: relative;
}
.content-container {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
}
.title {
  font-weight: 900;
}
.highlight {
  background-color: #294DCD33;
  font-weight: 400;
}
.popout {
  transition: 3s;
}
.bottom-text {
  position: absolute;
  bottom: 1.5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.down-chevron {
  transition: 300ms ease;
}
.down-chevron:hover {
  transform: translateY(5px)
}
</style>