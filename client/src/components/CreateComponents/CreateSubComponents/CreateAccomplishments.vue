<template>
  <div>

    <button @click="addAccomplishment()">Add Accomplishment</button>
    <br>
    <div v-for="(accomplishment, index) in accomplishments" :key="accomplishment.id">
      <div class="center" style="flex-direction: row;">
        <input type="text" placeholder="Title" v-model="accomplishments[index].title" />
        <input type="text" placeholder="Organization" v-model="accomplishments[index].organization" />
        <input type="text" placeholder="Description" v-model="accomplishments[index].description" />
        <input type="text" placeholder="Date" v-model="accomplishments[index].date" />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data: () => {
    return {
      accomplishments: []
    }
  },
  methods: {
    addAccomplishment() {
      this.accomplishments.push({
        title: '',
        organization: '',
        description: '',
        date: ''
      })
    }
  }
}
</script>

<style scoped>
  div {
    background-color: rgb(29, 189, 69);
  }
</style>