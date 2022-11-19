<template>
  <div class="action-btns px-10 pt-2">
    <div class="text-h4 action-btn pr-8">build</div>
    <div class="text-h4 action-btn px-8">explore</div>
    <div class="text-h4 action-btn px-8">register</div>
    <v-spacer></v-spacer>
    <div class="text-h4 action-btn">login</div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.action-btns {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: row;
}
.action-btn {
  font-weight: 900;
  cursor: pointer;
  color: rgb(229, 229, 229);
  transition: 300ms;
}
.action-btn:hover {
  text-decoration: underline;
  color: white;
}
</style>