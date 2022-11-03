export default {
  props: {
    data: {
      props: {
        data: {
          required: true,
          type: Object
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