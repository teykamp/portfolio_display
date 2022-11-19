<template>
  <div class="background-matte">
    <div class="background-fade"></div>
    <div class="title-container ma-10">
      <h1 class="title text-h1">
        <span class="popout" :style="popoutColorDisplay">Popout</span> Portfolio
      </h1>
      <p 
        class="text-h3" 
        style="font-weight: 200; cursor: default"
      >
        Create a portfolio on the cloud that 
        <span 
          @mouseover="playHighlightAnimation"
          :style="`width: ${highlightWidth}px`"
          class="highlight"
        ></span>
        stands out. 100% for free
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      highlightWidth: 0,
      highlightAnimationPlaying: false,
      popoutColor: 'red',
      popoutColors: [
        'red',
        'blue',
        'green'
      ]
    }
  },
  mounted() {
    this.popoutColorChange = setInterval(() => {
      const INX = this.popoutColors.indexOf(this.popoutColor)
      const LAST_COLOR = INX === this.popoutColors.length - 1
      this.popoutColor = LAST_COLOR ? this.popoutColors[0] : this.popoutColors[INX + 1]
    }, 2500)

    setTimeout(() => {
      this.playHighlightAnimation();
    }, 500)
  },
  destroyed() {
    clearInterval(this.popoutColorChange)
  },
  computed: {
    popoutColorDisplay() {
      return `color: ${this.popoutColor}`
    }
  },
  methods: {
    playHighlightAnimation() {
      if (this.highlightAnimationPlaying) return;
      this.highlightWidth = 0;
      const HIGHLIGHT_WIDTH = 230;
      const TRANSITION_DUR = 3.5;

      this.highlightAnimationPlaying = true;
      setTimeout(() => {
        this.highlightAnimationPlaying = false;
      // final transition dur in ms = HIGHLIGHT_WIDTH * TRANSITION_DUR
      }, TRANSITION_DUR * HIGHLIGHT_WIDTH)

      for (let i = 0; i < HIGHLIGHT_WIDTH; i++) {
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
  width: 100%;
  height: 55%;
  background: linear-gradient(180deg, #294DCD 0%, rgba(53, 69, 205, 0.61) 22.57%, rgba(93, 41, 205, 0.00990103) 100%);
}
.background-matte {
  width: 100vw;
  height: 100vh;
  background-color: white;
}
.title {
  font-weight: 900;
}
.title-container {
  position: absolute;
  width: 70%;
  top: 15%;
}
.highlight {
  position: absolute;
  background-color: #294DCD33;
  height: 50px;
}
.popout {
  transition: 5s;
}
</style>