export default {
  props: {
    data: {
      props: {
        data: {
          required: false,
          type: Array,
          default: []
        },
        backgroundColor: {
          required: false,
          type: String,
          default: 'white'
        }
      }
    }
  }
}