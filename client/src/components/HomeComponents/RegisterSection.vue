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
          Join our amazing community of dedicated professionals
        </p>
        <div class="text-box-container">
          <input
            v-model.trim="username"
            placeholder="username *"
            type="text" 
            class="text-box text-h4 pl-3 mb-5"
          />
          <input
            v-model="password"
            :type="passwordBoxType" 
            placeholder="password *"
            class="text-box text-h4 pl-3 mb-5"
          />
          <input
            v-model="rePassword"
            :type="passwordBoxType" 
            placeholder="re-enter password *"
            class="text-box text-h4 pl-3"
          />
        </div>
        <div style="display: flex; flex-direction: row; align-items: center;">
          <v-checkbox
            v-model="showPassword"
            color="black"
          ></v-checkbox>
          <div 
            @click.stop="showPassword = !showPassword"
            class="text-h6"
            style="font-weight: 300; cursor: pointer; user-select: none"
          >
            show password
          </div>
        </div>
        <div 
          @click.stop="register"
          :style="`${sm ? 'width: 90vw; height: 70px; font-size: 34pt':''}`"
          class="register-btn"
        >
          Register Now
        </div>
        <div
          v-if="loggedInUser"
          class="white--text text-h5 mt-3" 
          style="font-weight: 300"
        >
          Logged in as {{ loggedInUser }}.
          <span
            @click.stop="login"
            style="text-decoration: underline; cursor: pointer"
          >
            Logout here
          </span>
        </div>
        <div 
          v-else
          class="white--text text-h5 mt-3" 
          style="font-weight: 300"
        >
          Already have an account? 
          <span
            @click.stop="login"
            style="text-decoration: underline; cursor: pointer"
          >
            Login here
          </span>
        </div>
        <div 
          v-show="error" 
          class="text-h5 error--text mt-4"
          style="display: flex; flex-direction: row; align-items: center;"
        >
          <v-icon 
            color="error"
            class="mr-2"
            large
          >mdi-alert-outline</v-icon>
          {{ error }}
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rePassword: '',
      error: '',
      showPassword: false,
      loggedInUser: localStorage.getItem('username')
    }
  },
  computed: {
    passwordBoxType() {
      return this.showPassword ? 'text' : 'password';
    },
    sm() {
      return !this.$vuetify.breakpoint.mdAndUp;
    }
  },
  methods: {
    login() {
      this.$router.push({
        name: 'Auth',
        query: {
          type: 'login'
        }
      });
    },
    register() {
      if (localStorage.getItem('username')) {
        return this.error = `Already Signed In As ${localStorage.getItem('username')}`;
      }

      if (!(this.username && this.password && this.rePassword)) {
        return this.error = 'All Fields Must Be Filled';
      }

      const MIN_PASSWORD_LEN = 6;
      if (this.password.length < MIN_PASSWORD_LEN) {
        return this.error = `Password Too Short: Min Length ${MIN_PASSWORD_LEN}`;
      }
      if (this.password !== this.rePassword) {
        return this.error = 'Passwords Do Not Match';
      }
      this.$router.push({
        name: 'Auth',
        query: {
          type: 'register',
          payload: {
            username: this.username,
            password: this.password
          }
        }
      })
    }
  },
  watch: {
    error(v) {
      if (v) {
        setTimeout(() => {
          if (this.error) this.error = '';
        }, 5000)
      }
    }
  }
}
</script>

<style scoped>
.background-matte {
  position: fixed;
  background: linear-gradient(#4286DE, #88a8d1);
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

.register-btn {
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

.register-btn:hover {
  background: rgb(209, 250, 255);
}
</style>