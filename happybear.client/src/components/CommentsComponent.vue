<template>
  <div class="comments-component">
    <div class="card">
      <div class="row justify-content-center">
        <div class="col-8 mt-4 text-center">
          <p><small>{{ commentProp.creator.name }}</small></p>
        </div>
        <div class=" col-2 text-right">
          <button type="button" class="btn x-btn" @click="deleteComment()">
            &times;
          </button>
        </div>
      </div>
      <div class="row justify-content-center">
        <p><small>{{ commentProp.body }}</small></p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'

export default {
  name: 'CommentsComponent',
  props: {
    commentProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      posts: computed(() => AppState.posts),
      comments: computed(() => AppState.comments)
    })
    return {
      state,
      async deleteComment() {
        try {
          await commentsService.deleteComment(props.commentProp.id)
          await commentsService.getComments(props.commentProp.id)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style>
.commentrow{
  border: solid 1px rgb(236, 235, 235);
}
.card{
      border: 10px ridge grey;
    overflow-y: auto;
    /* border-radius: 5%; */

}
</style>
