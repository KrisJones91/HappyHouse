<template>
  <div class="posts-component row justify-content-center">
    <div class="col card">
      <div class="row">
        <div class="col-2 text-center pl-0">
          <img :src="postProp.creator.picture" class="image mt-2" alt="">
        </div>
        <div class="col text-left">
          <p class="mt-2">
            <b>
              <router-link class="text-dark" :to="{ name: 'Account' }">
                <em> {{ postProp.creator.name }} </em>
              </router-link>
              <!-- <em class="email"> {{ postProp.creator }} </em> -->
            </b>
          </p>
          <h5 class="text-primary title">
            {{ postProp.title }}
          </h5>
          <p><small>{{ postProp.body }}</small></p>
        </div>
        <div class="col-2 m-1">
          <button type="button" class="btn x-btn" @click="deletePost">
            &times;
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
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      posts: computed(() => AppState.posts)
    })
    return {
      state,
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
.card{
  border: 1px solid rgb(216, 216, 216);
  background-color: rgb(255, 255, 255);
  background: linear-gradient(#ffffff, #e4e4e4 );
}
.email{
  color: #8f8f8f;
  margin-left: 8%;
}
.email:hover{
  color: blue;
}
.x-btn{
  color: black;
  margin-top: 10px;
  border: none;
}
.x-btn:hover{
  color: red;
  transform: scale(1.4);
  border: none;
}
</style>
