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
            >Register</span>
            <span 
              :style="sm ? 'font-size: 18pt':''"
              :class="`sub-text ${sm ? '':'text-h3'} ml-1`"
            >an account</span>
          </h1>
          <p 
            class="body-text" 
            :style="`font-weight: 100; font-size: ${sm ? '15pt':''}; line-height: ${sm ? '18pt':''};`"
          >
            Join our amazing and dedicated community of professionals
          </p>
          <div class="text-box-container">
            <input
              placeholder="username *"
              type="text" 
              class="text-box text-h4 pl-3"
            />
            <input
              placeholder="password *"
              type="text" 
              class="text-box text-h4 pl-3"
            />
            <input
              placeholder="re-enter password *"
              type="text" 
              class="text-box text-h4 pl-3"
            />
          </div>
        </div>
      </div>
      <div v-if="!sm" class="img-container">
        <div class="center">
        <v-img
          src="../../assets/LandingPage/account-plus.svg"
          style="filter: invert(100%); transform: translateY(125px)"
          width="300px"
        ></v-img>
        </div>
      </div>
    </div>
    <div class="center">
      <div 
        @click.stop="register"
        :style="`transform: translateY(-10px); ${sm ? 'width: 90vw; height: 70px; font-size: 34pt':''}`"
        class="get-started-btn"
      >
        Register Now
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    register() {
      this.$router.push({
        name: 'Auth',
        query: {
          type: 'register'
        }
      })
    }
  }
}
</script>

<style scoped>
.background-matte {
  position: fixed;
  background: linear-gradient(#4286DE, #FFFFFF);
  width: 100vw;
  height: 100vh;
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

.text-box-container {
  display: flex;
  flex-direction: column;
}

.text-box {
  width: 350px;
  height: 60px;
  background: white;
  border-radius: 10px;
  font-size: 20pt;
  font-weight: 100;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: 300ms;
  margin-bottom: 30px;
}

.text-box:hover {
  box-shadow: 5px 7px 7px rgba(0, 0, 0, 0.25);
  background: rgb(241, 245, 252)
}

.img-container {
  width: 30%; 
  height: 100%; 
  /* border: 4px solid white; */
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
  background: rgb(209, 250, 255);
}
</style>