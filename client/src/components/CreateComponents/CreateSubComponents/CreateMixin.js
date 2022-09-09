import Toolbar from '../../ReusableComponents/CreateToolbar.vue'
import Calender from '../../ReusableComponents/CreateCalender.vue'
import CardWrapper from './CreateCardWrapper.vue'

export default {
  data() {
    return {
      required: value => !!value || 'Required'
    }
  },
  destroyed() {
    this.emitData();
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
    }
  }
}