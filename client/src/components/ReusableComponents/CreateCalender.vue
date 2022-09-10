<template>
  <div>
    <div class="center">

      <v-btn 
        class="mb-2" 
        small
        @click.stop="date = ''" 
        :style="clearBtnStyle"
      >
        Clear Calender
      </v-btn>

      <v-date-picker 
        v-model="date" 
        :header-color="color"
        :type="calendarType" 
        color="secondary"
      ></v-date-picker>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    providedDate: {
      required: true,
      default: '',
      type: String
    },
    calendarType: {
      required: false,
      default: 'month',
      type: String
    },
    headerColor: {
      required: false,
      default: 'primary',
      type: String
    }
  },
  data() {
    return {
      date: ''
    }
  },
  computed: {
    clearBtnStyle() {
      return this.date ? 'opacity: 1' : 'opacity: 0; cursor: default';
    },
    color() {
      return this.date ? this.headerColor : 'red darken-2';
    }
  },
  mounted() {
    this.date = this.providedDate;
  },
  watch: {
    date(v) {
      this.$emit('date-updated', v);
    }
  }
}
</script>