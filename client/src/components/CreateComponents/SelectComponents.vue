<template>
  <div>
    <Toolbar
      :title="'Add Components'"
      :exitAction="() => $parent.editComponentView = false"
      :disableAddBtn="true"
    />
    {{ selectedComponents }}
  </div>
</template>

<script>
import Toolbar from '../ReusableComponents/CreateToolbar.vue'

export default {
  props: [
    'selectedComponents'
  ],
  components: {
    Toolbar
  }
}
</script>