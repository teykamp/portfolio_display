<template>
  <div>

    <div class="center">
      <v-btn 
      class="mb-2" 
      small
      @click="date = ''" 
      :style="`${date ? 'opacity: 1' : 'opacity: 0; cursor: default'}`"
      >
        Clear Calender
      </v-btn>
      <v-date-picker type="month" v-model="date" header-color="primary"
      color="secondary"></v-date-picker>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    providedDate: {
      required: true,
      default: ''
    }
  },
  data() {
    return {
      date: ''
    }
  },
  mounted() {
    this.date = this.providedDate;
  },
  watch: {
    date() {
      this.$emit('date-updated', this.date);
    }
  }
}
</script>