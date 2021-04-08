<template>
  <div class="post container-fluid">
    <div class="row">
      <div class="col">
        <h1>Post Page</h1>
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
export default {
  name: 'Post',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await postsService.getOne(route.params.id)
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
