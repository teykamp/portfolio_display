<template>
  <div>
    <Toolbar
      :title="'Add Components'"
      :exitAction="() => $parent.editComponentView = false"
      :disableAddBtn="true"
    />
    {{ userData }}
  </div>
</template>

<script>
import Toolbar from '../ReusableComponents/CreateToolbar.vue'

export default {
  props: [
    'userData'
  ],
  components: {
    Toolbar
  }
}
</script>