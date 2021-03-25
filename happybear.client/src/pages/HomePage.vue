<template>
  <div class="home container-fluid">
    <div class="row justify-content-center m-0">
      <div class="col-3 col">
        <img :src="state.user.picture" class="p-2" alt="">
        <h4>{{ state.user.nickname }}</h4>
        <p>{{ state.user.email }}</p>
      </div>
      <div class="col-11 col-md-6 mt-4">
        <form type="submit" @submit.prevent="createPost">
          <div class="form-group m-2">
            <input type="text"
                   class="form-control"

                   id="title"
                   v-model="state.newPost.title"
                   placeholder="Title..."
                   required
            >
            <textarea type="text"
                      class="form-control"
                      id="body"
                      v-model="state.newPost.body"
                      placeholder="What makes you happy?"
                      required
            />
            <button type="submit" class="btn btn-outline-primary">
              Post
            </button>
          </div>
        </form>
        <PostsComponent v-for="post in state.posts" :key="post.id" :post-prop="post" />
      </div>
      <div class="col-3 col-md-3">
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
      posts: computed(() => AppState.posts),
      newPost: {}

    })
    onMounted(async() => {
      try {
        await postsService.getPosts()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      async createPost() {
        try {
          const id = await postsService.createPost(state.newPost)
          state.newPost = {}
          logger.log(id)
        } catch (error) {
          logger.log(error)
        }
      }
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
