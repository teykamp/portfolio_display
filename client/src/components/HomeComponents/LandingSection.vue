<template>
  <div class="background-matte">
    <div class="background-fade"></div>
    <div class="content-container pl-10">
      <div style="width: 70%">
        <h1 class="title text-h1">
          <span 
            :style="popoutColorDisplay"
            class="popout" 
          >Popout</span> Portfolio
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
          <span style="font-weight: 400">
            stands out.
          </span>
          100% for free
        </p>
      </div>
      <img
        src="../../assets/LandingPage/notepad.png"
        alt="portfolio"
        style="mix-blend-mode: darken; width: 25%"
      />
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
      this.popoutColor = '#294DCD'
    }, 10)
    this.popoutColorChange = setInterval(() => {
      const INX = this.popoutColors.indexOf(this.popoutColor)
      const LAST_COLOR = INX === this.popoutColors.length - 1
      this.popoutColor = LAST_COLOR ? this.popoutColors[0] : this.popoutColors[INX + 1]
    }, 2000)

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
      const HIGHLIGHT_WIDTH = 240;
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
  background: white;
}
.content-container {
  position: absolute;
  top: 12.5%;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
}
.title {
  font-weight: 900;
}
.highlight {
  position: absolute;
  background-color: #294DCD33;
  height: 50px;
}
.popout {
  transition: 3s;
}
</style>