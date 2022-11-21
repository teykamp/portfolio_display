<template>
  <div :class="`background-matte pt-${sm ? '0':'12'}`">
    <SearchBoxIcon />
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
              :style="`${sm ? 'font-size: 39pt':''}; font-weight: 900`"
              :class="sm ? '':'text-h1'"
            >Explore</span>
            <span
              :style="`${sm ? 'font-size: 18pt':''}; font-weight: 300`"
              :class="`${sm ? '':'text-h3'} ml-2`"
            >what is out there</span>
          </h1>
        </div>
        <div class="path" style="transform: rotate(30deg) translate(200px, 400px);"></div>
        <div class="path" style="transform: rotate(-30deg) translate(100px, 400px);"></div>
        <div class="path" style="transform: rotate(30deg) translate(10px, 300px);"></div>
      </div>
      <div v-if="!sm" class="img-container">
        <div class="center">
        <v-img
          src="../../assets/LandingPage/map.svg"
          style="filter: invert(100%); transform: translateY(125px)"
          width="300px"
        ></v-img>
        </div>
      </div>
    </div>
    <div class="center">
      <div
        @click.stop="$emit('updateCurrentSection', 'register')"
        class="bottom-text"
      >
        <p 
          class="text-p" 
          style="font-size: 20pt; font-weight: 200; margin: 0%"
        >
          register an account
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
import SearchBoxIcon from './HomeSubComponents/SearchBoxIcon.vue'

export default {
  computed: {
    sm() {
      return !this.$vuetify.breakpoint.mdAndUp;
    }
  },
  components: {
    SearchBoxIcon
  }
}
</script>

<style scoped>
  .path {
    border-top: 18px dashed white;
    width: 25%;
  }
  .background-matte {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: #67AC5B;
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