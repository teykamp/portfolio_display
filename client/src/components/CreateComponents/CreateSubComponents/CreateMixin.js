import Toolbar from '../../ReusableComponents/CreateToolbar.vue'
import Calender from '../../ReusableComponents/CreateCalender.vue'
import CardWrapper from './CreateCardWrapper.vue'

import { validate } from '../../../utils/ValidatePortfolio'

export default {
  data() {
    return {
      items: [],
      required: value => !!value || 'Required'
    }
  },
  created() {
    if (this.component === 'Header') return
    this.items = this.userData[this.component].content || [];
  },
  destroyed() {
    this.emitData();
  },
  methods: {
    removeItem(index) {
      this.items.splice(index, 1);
    },
    leaveEditView() {
      this.$parent.editComponentView = false;
    },
    validate(obj) {
      return validate(obj)
    },
    emitData() {
      this.$emit('update-component-data', {
        componentType: this.component,
        content: this.items
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