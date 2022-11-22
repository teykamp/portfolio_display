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
              :style="`${sm ? 'font-size: 39pt':''}; font-weight: 900`"
              :class="sm ? '':'text-h1'"
            >Explore</span>
            <span
              :style="`${sm ? 'font-size: 18pt':''}; font-weight: 300`"
              :class="`${sm ? '':'text-h3'} ml-2`"
            >what is out there</span>
          </h1>
          <div style="transform: translate(45%, 10%)">
            <div class="destination-container">
              <div class="path" style="transform: rotate(-20deg)"></div>
              <div 
                style="width: 40%; transform: translate(-250px, 0px);"
                class="text-h4 white--text"
              >Find out what others are up to</div>
            </div>
            <div class="destination-container">
              <div class="path" style="transform: rotate(20deg)"></div>
              <div 
                style="width: 30%; transform: translate(190px, 0px)"
                class="text-h4 white--text"
              >Get inpired and come up with ideas</div>
            </div>
            <div class="destination-container">
              <div class="path" style="transform: rotate(-20deg)"></div>
              <div 
                style="width: 30%; transform: translate(-250px, 0px)"
                class="text-h4 white--text"
              >Connect with professionals in your field</div>
            </div>
            <div class="destination-container">
              <div class="path" style="transform: rotate(20deg)"></div>
              <div style="transform: translate(200px, 0px)">
                <SearchBoxIcon />
              </div>
            </div>
          </div>
         </div>
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

.destination-container {
  width: 100%; 
  height: 20%; 
  position: relative;
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