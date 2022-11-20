<template>
  <div :class="`background-matte pt-${sm ? '0':'12'}`">
    <div
      style="top: 10%"
      class="content-container"
    >
      <div 
        :style="sm ? 'width: 90%':''"
        class="inner-container-text"
      >
        <div class="title-container">
          <h1 style="color: white; margin: 0%">
            <span 
              :style="sm ? 'font-size: 39pt':''"
              :class="`main-text ${sm ? '':'text-h1'}`"
            >Build</span>
            <span 
              :style="sm ? 'font-size: 18pt':''"
              :class="`sub-text ${sm ? '':'text-h3'} ml-1`"
            >something amazing</span>
          </h1>
          <p 
            class="body-text" 
            :style="`font-weight: 100; font-size: ${sm ? '15pt':''}; line-height: ${sm ? '18pt':''};`"
          >
            Making a stunning portfolio to display 
            what you have accomplished has never been easier.
          </p>
          <div 
            style="display: flex; flex-direction: row;" 
            class="mt-8"
          >
            <div class="center timeline-container">
              <div class="dot ma-1"></div>
              <div class="stripe ma-1"></div>
              <div class="dot ma-1"></div>
              <div class="stripe ma-1"></div>
              <v-icon 
                color="white" 
                large
              >mdi-check-bold</v-icon>
            </div>
            <div class="timeline-text-container ml-5">
              <p 
                :style="`font-weight: 400; font-size: ${sm ? '16pt':''}; line-height: ${sm ? '18pt':''};`"
                class="body-text"
              >
                Add info about yourself, then drag and drop each component into place.
              </p>
              <p 
                :style="`font-weight: 200; font-size: ${sm ? '16pt':''}; line-height: ${sm ? '18pt':''};`"
                class="body-text" 
              >
                Share your portfolio with others by sending them a 
                custom link in just one click.
              </p>
              <p 
                :style="`font-weight: 400; font-size: ${sm ? '16pt':''}; line-height: ${sm ? '18pt':''};`"
                class="body-text" 
              >
                Done!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!sm" class="img-container">
        <div class="center">
        <v-img
          src="../../assets/LandingPage/wrench.svg"
          style="filter: invert(100%); transform: translateY(125px)"
          width="300px"
        ></v-img>
        </div>
      </div>
    </div>
    <div class="center">
      <div 
        @click.stop="getStarted"
        :style="`transform: translateY(-10px); ${sm ? 'width: 90vw; height: 70px; font-size: 34pt':''}`"
        class="get-started-btn"
      >
        Get Started Now
      </div>
      <div
        @click.stop="$emit('updateCurrentSection', 'explore')"
        class="bottom-text"
      >
        <p 
          class="text-p" 
          style="font-size: 20pt; font-weight: 200; margin: 0%"
        >
          explore what's out there
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
  </div>
</template>

<script>
export default {
  computed: {
    sm() {
      return !this.$vuetify.breakpoint.mdAndUp;
    }
  },
  methods: {
    getStarted() {
      this.$router.push({
        name: 'Build'
      })
    }
  }
}
</script>

<style scoped>
.background-matte {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: linear-gradient(180deg, #E15241 0%, #E1AB41 0.01%, #E16455 100%);
}
.content-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 80%;
  position: relative;
  /* border: 5px solid black; */
}

.main-text {
  font-weight: 900;
}

.sub-text {
  font-weight: 300;
}

.body-text {
  color: white;
  font-size: 20pt;
  line-height: 35px;
}

.title-container {
  position: absolute; 
  top: 0;
  left: 0;
  /* border: 2px solid red; */
}

.inner-container-text {
  width: 50%; 
  height: 100%; 
  position: relative; 
  /* border: 4px solid white; */
}

.img-container {
  width: 30%; 
  height: 100%; 
  /* border: 4px solid white; */
}

.dot {
  height: 25px;
  width: 25px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
}

.stripe {
  width: 5px;
  height: 40px;
  background: white;
  border-radius: 1px;
}

.timeline-text-container {
  display: flex; 
  flex-direction: column; 
  transform: translateY(-10px);
}

.timeline-container {
  width: 50px; 
  height: 100%;
  /* border: 3px solid green; */
}

.get-started-btn {
  text-align: center; 
  font-size: 40pt; 
  font-weight: 900;
  width: 450px;
  height: 80px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  transition: 300ms;
  cursor: pointer;
  z-index: 2;
}

.get-started-btn:hover {
  background: rgb(255, 215, 142);
}

.down-chevron {
  transition: 300ms ease;
}

.down-chevron:hover {
  transform: translateY(5px)
}

.bottom-text {
  position: absolute;
  bottom: 1.5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
</style>