<template>
  <div class="background-matte pt-12">
    <div class="content-container pa-10">
      <div class="inner-container-text">
        <div class="title-container">
          <h1 style="color: white; margin: 0%">
            <span class="main-text text-h1">Build</span>
            <span class="sub-text ml-3 text-h3">something amazing</span>
          </h1>
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
        </div>
      </div>
      <div style="width: 40%; height: 100%; border: 4px solid white;">
        <div class="center">
        <v-img
          src="../../assets/LandingPage/wrench.svg"
          style="filter: invert(100%); transform: translateY(125px)"
          width="300px"
        ></v-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
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
  border: 5px solid black;
}
.main-text {
  font-weight: 900;
}
.sub-text {
  font-weight: 300;
}
.title-container {
  position: absolute; 
  top: 0;
  left: 0;
  border: 2px solid red;
}
.inner-container-text {
  width: 60%; 
  height: 100%; 
  position: relative; 
  border: 4px solid white;
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
  height: 50px;
  background: white;
  border-radius: 1px;
}
.timeline-container {
  width: 50px; 
  height: 100%;
  border: 3px solid green;
}
</style>