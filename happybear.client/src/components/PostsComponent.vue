<template>
  <div class="posts-component row justify-content-center">
    <div class="col card">
      <div class="row">
        <div class="col-2 text-center pl-0">
          <img :src="state.user.picture" class="image mt-2" alt="">
        </div>
        <div class="col text-left">
          <p class="mt-1">
            <b>{{ postProp.title }}</b>
          </p>
          <p>{{ postProp.body }}</p>
        </div>
        <div class="col-2 m-1">
          <button type="button" @click="deletePost">
            x
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
// import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'

export default {
  name: 'PostsComponent',
  props: {
    postProp: { type: Object, required: true }
  },
  setup(props) {
    // const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      account: computed(() => AppState.account),
      async deletePost() {
        try {
          await postsService.deletePost(props.postProp._id)
        } catch (error) {
          logger.log(error)
        }
      }
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
