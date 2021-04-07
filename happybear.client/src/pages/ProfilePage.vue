<template>
  <div class="profile container-fluid">
    <div class="row justify-content-center">
      <div class="col text-center">
        <h1> Profile Page </h1>
        <div class="col text-center">
          <PostsComponent v-for="post in state.posts" :key="post.id" :post-prop="post" />
        </div>
        <!-- <p>{{ state.posts }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted } from '@vue/runtime-core'
import { postsService } from '../services/PostsService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'

export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts)
    })
    onMounted(async() => {
      try {
        await postsService.getPostsByAccountId(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
