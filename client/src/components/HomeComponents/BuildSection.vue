<template>
  <div class="background-matte pt-12">
    <div class="content-container">
      <div class="inner-container-text">
        <div class="title-container">
          <h1 style="color: white; margin: 0%">
            <span class="main-text text-h1">Build</span>
            <span class="sub-text ml-3 text-h3">something amazing</span>
          </h1>
          <p 
            class="body-text" 
            style="font-weight: 100"
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
                class="body-text"
                style="font-weight: 400"
              >
                Add info about yourself, then drag and drop each component into place.
              </p>
              <p 
                class="body-text" 
                style="font-weight: 200"
              >
                Share your portfolio with others by sending them a 
                custom link in just one click.
              </p>
              <p 
                class="body-text" 
                style="font-weight: 400"
              >
                Done!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="img-container">
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
        class="get-started-btn"
        style="transform: translateY(-20px)"
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
  top: 10%;
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