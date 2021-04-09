<template>
  <div class="post container-fluid">
    <div class="row justify-content-center">
      <div class="col-6 card text-center m-5">
        <h3>{{ state.activePost.title }}</h3>
        <p>{{ state.activePost.body }}</p>
        <div class="row justify-content-center">
          <div class=" col card Icomment-card">
            <form type="submit" @submit.prevent="createComment">
              <div class="form-group m-2">
                <input type="text"
                       class="form-control"
                       id="body"
                       v-model="state.newComment.body"
                       placeholder="Comment..."
                       required
                >
              </div>
              <button type="submit" class="btn btn-outline-primary m-1">
                Comment
              </button>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <CommentsComponent v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { postsService } from '../services/PostsService'
import { useRoute } from 'vue-router'
import { commentsService } from '../services/CommentsService'

export default {
  name: 'Post',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      activePost: computed(() => AppState.activePost),
      comments: computed(() => AppState.comments[route.params.id]),
      newComment: { postId: route.params.id }
    })
    onMounted(async() => {
      try {
        await postsService.getOne(route.params.id)
        await commentsService.getComments(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      async createComment() {
        try {
          await commentsService.createComment(state.newComment)
          state.newComment = { postId: route.params.id }
          await commentsService.getComments(route.params.id)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style>

</style>
