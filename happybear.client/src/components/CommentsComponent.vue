<template>
  <div class="comments-component">
    <div class="row card">
      <p><small>{{ commentProp.body }}</small></p>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from '@vue/reactivity'
import { AppState } from '../AppState'

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
      state
    }
  }
}
</script>

<style>

</style>
