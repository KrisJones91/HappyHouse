<template>
  <div class="posts-component row justify-content-center">
    <div class="col card m-2">
      <div class="row">
        <div class="col-2 text-center pl-0">
          <img :src="postProp.creator.picture" class="image mt-2" alt="user picture" v-if="postProp.creator">
        </div>
        <div class="col text-left ">
          <p class="mt-2">
            <b>
              <router-link class="text-dark" :to="{ name: 'Profile', params:{id: postProp.creatorId} }">
                <em v-if="postProp.creator"> {{ postProp.creator.name }} </em>
              </router-link>
              <small><em class="email"> {{ convertUpdate(postProp.createdAt) }} </em></small>
            </b>
          </p>
          <h5 class="text-primary title">
            <router-link :to="`/post/${postProp.id}`">
              {{ postProp.title }}
            </router-link>
          </h5>
          <p><small>{{ postProp.body }}</small></p>
        </div>
        <div class="col-2 m-1">
          <button type="button" class="btn x-btn" @click="deletePost">
            &times;
          </button>
        </div>
      </div>
      <div class="row num-box">
        <div class="col-4 text-right">
          <i class="far fa-comments text-black p-0"></i>
          <p class="text-black pt-0" v-if="state.comments">
            <small>{{ state.comments.length }}</small>
          </p>
        </div>
        <div class="col-4">
          <i class="far fa-smile"></i>
          <p>{{ postProp.likes }}</p>
        </div>
        <div class="col-4 text-left">
          <i class="far fa-bookmark"></i>
          <p>{{ postProp.saves }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- <p>{{ state.posts }}</p> -->
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
// import { useRoute } from 'vue-router'
import { commentsService } from '../services/CommentsService'
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
      // looks into own individual array
      comments: computed(() => AppState.comments[props.postProp.id])
    })
    onMounted(async() => {
      try {
        await commentsService.getComments(props.postProp._id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      posts: computed(() => AppState.posts),
      async deletePost() {
        try {
          await postsService.deletePost(props.postProp._id)
        } catch (error) {
          logger.log(error)
        }
      },
      convertUpdate(updatedAt) {
        const dateYear = updatedAt.slice(0, 4)
        const dateMonth = updatedAt.slice(5, 7)
        const dateDay = updatedAt.slice(8, 10)
        return dateMonth + '/' + dateDay + '/' + dateYear
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
.num-box{
  border: solid 1px rgb(179, 179, 179);
  background: linear-gradient(#fac37a, #ec8c1f );;
  height: 50px;
}
</style>
