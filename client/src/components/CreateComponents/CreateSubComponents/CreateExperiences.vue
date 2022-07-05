<template>
  <div>

    <button @click="addExpirience()">Add Expirience</button>
    <br>
    <div v-for="(expirience, index) in expiriences" :key="expirience.id">
      <div class="center" style="flex-direction: row;">
        <input type="text" placeholder="Title" v-model="expiriences[index].title" />
        <input type="text" placeholder="Company" v-model="expiriences[index].company" />
        <input type="text" placeholder="Company Logo URL" v-model="expiriences[index].companyImg" />
        <input type="text" placeholder="Description" v-model="expiriences[index].description" />
        <input type="text" placeholder="Date" v-model="expiriences[index].date" />
        <button @click="removeExpirience(index)">x</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data: () => {
    return {
      expiriences: []
    }
  },
  methods: {
    removeExpirience(index) {
      this.expiriences.splice(index, 1);
    },
    addExpirience() {
      this.expiriences.push({
        title: '',
        company: '',
        companyImg: '',
        description: '',
        date: ''
      })
    }
  }
}
</script>

<style scoped>
div {
  background-color: rgb(29, 184, 189);
}
</style>