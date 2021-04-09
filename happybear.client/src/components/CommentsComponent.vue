<template>
  <div class="comments-component">
    <div class="row card">
      <div class="row justify-content-center">
        <div class="col text-center">
          <p>{{ commentProp.creator.name }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <p><small>{{ commentProp.body }}</small></p>
        </div>
      </div>
    </div>
    <!-- <div class="col-6">
        <button type="button" class="btn x-btn" @click="deleteComment">
          &times;
        </button>
      </div>
    </div> -->
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
</style>
