<template>
  <div class="home container-fluid">
    <div class="row justify-content-center m-0">
      <div class="col-3 col">
        <router-link :to="{ name: 'Account' }">
          <img :src="state.user.picture" class="profImage p-0 mt-2" alt="">
        </router-link>
        <h4>{{ state.user.nickname }}</h4>
        <p>{{ state.user.email }}</p>
        <!-- <div class="card text-center" v-if="state.posts">
          <p>posts: {{ state.posts }}</p>
        </div> -->
      </div>
      <div class="col-11 col-md-6 mt-4">
        <form type="submit" @submit.prevent="createPost()">
          <div class="form-group m-2">
            <input type="text"
                   class="form-control iTitle"

                   id="title"
                   v-model="state.newPost.title"
                   placeholder="What makes you happy?"
                   required
            >
            <textarea type="text"
                      class="form-control iBody"
                      id="body"
                      v-model="state.newPost.body"
                      placeholder="Share your story..."
                      required
            />
            <button type="submit" class="btn btn-outline-primary m-1">
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
      account: computed(() => AppState.account),
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
          await postsService.createPost(state.newPost)
          state.newPost = {}
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
    image-rendering: pixelated;
  }
}
.iTitle:hover{
  border: 1px solid #e2871f;
}
.iBody:hover{
  border: 1px solid #e2871f;
}
.profImage{
  border:inset #ec8c1f 2px;
}
</style>
