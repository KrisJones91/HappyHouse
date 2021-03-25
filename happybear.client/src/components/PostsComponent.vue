<template>
  <div class="posts-component row justify-content-center">
    <div class="col card">
      <div class="row">
        <div class="col-2 text-center pl-0">
          <img :src="state.user.picture" class="image mt-2" alt="">
        </div>
        <div class="col text-left">
          <p class="mt-1">
            <b>{{ postProp.creator.name }}</b>
          </p>
          <p>{{ postProp.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'
// import { postsService } from '../services/PostsService'

export default {
  name: 'PostsComponent',
  props: {
    postProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style>
.image{
  border-radius: 50%;
  max-height: 40%;
  max-width: 40%;
}
</style>
