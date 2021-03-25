<template>
  <div class="posts-component">
    <div class="col text-left card">
      <p><b>{{ postProp.creator.name }}</b></p>
      <p>{{ postProp.body }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'
// import { postsService } from '../services/PostsService'

export default {
  name: 'PostsComponent',
  props: {
    postProp: { type: Object, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style>

</style>
