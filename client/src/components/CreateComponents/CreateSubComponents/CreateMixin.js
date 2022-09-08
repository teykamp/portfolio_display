import Toolbar from '../../ReusableComponents/CreateToolbar.vue'
import Calender from '../../ReusableComponents/CreateCalender.vue'
import CardTitle from './CreateCardTitle.vue'

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
    CardTitle
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  }
}