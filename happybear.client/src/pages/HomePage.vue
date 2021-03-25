<template>
  <div class="home container-fluid">
    <div class="row justify-content-center m-0">
      <div class="col-3">
        <img :src="state.user.picture" class="p-2" alt="">
        <h4>{{ state.user.nickname }}</h4>
        <p>{{ state.user.email }}</p>
      </div>
      <div class="col-6">
        <PostsComponent v-for="post in state.posts" :key="post.id" :post-prop="post" />
      </div>
      <div class="col">
        <h4>Notifications</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      posts: computed(() => AppState.posts)

    })
    onMounted(async() => {
      try {
        await postsService.getPosts()
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

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
