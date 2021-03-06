/* eslint-disable no-console */
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data
  }

  async getOne(id) {
    const res = await api.get('api/posts/' + id)
    AppState.activePost = res.data
    console.log(AppState.activePost)
  }

  async getPostsByAccountId(id) {
    const res = await api.get('api/profiles/' + id + '/posts')
    AppState.posts = res.data
  }

  async createPost(post) {
    const res = await api.post('api/posts', post)
    AppState.posts.push(res.data)
  }

  async editPost(id, newTitle, newBody) {
    const eTitle = { title: newTitle }
    const eBody = { body: newBody }
    const res = await api.put('api/posts/' + id, eTitle, eBody)
    logger.log(res)
  }

  async deletePost(_id) {
    await api.delete('api/posts/' + _id)
    const postInd = AppState.posts.findIndex(p => p._id === _id)
    AppState.posts.splice(postInd, 1)
  }
}
export const postsService = new PostsService()
