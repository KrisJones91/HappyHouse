<template>
  <div class="posts-component">
    <div class="masonry">
      <div class="item card m-3">
        <div class="card-header">
          <h3>{{ postProp.creator.name }}</h3>
        </div>
        <div class="card-body">
          <p><b>{{ postProp.title }}</b></p>
          {{ postProp.body }}
        </div>
        <div class="card-footer">
          {{ postProp.creator.name }}
        </div>
        <!-- <p>{{ postProp }}</p> -->
      </div>
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
