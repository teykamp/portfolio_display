import Toolbar from '../../ReusableComponents/CreateToolbar.vue'
import Calender from '../../ReusableComponents/CreateCalender.vue'
import CardWrapper from './CreateCardWrapper.vue'

export default {
  data() {
    return {
      required: value => !!value || 'Required'
    }
  },
  created() {
    console.log('running')
  },
  destroyed() {
    this.emitData();
  },
  methods: {
    emitData() {
      this.$emit('update-component-data', {
        componentType: 'projects',
        content: this.projects
      });
    }
  },
  computed: {
    componentTitle() {
      return `${this.component[0].toUpperCase()}${this.component.substring(1)}`;
    },
  },
  components: {
    Toolbar,
    Calender,
    CardWrapper
  },
  props: {
    userData: {
      type: Object,
      required: true
    },
    component: {
      type: String,
      required: true
    }
  }
}