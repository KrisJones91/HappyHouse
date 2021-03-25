import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data
  }

  async createPost(post) {
    const res = await api.post('api/posts', post)
    AppState.posts.push(res.data, post)
    this.getPosts()
    return res.data
  }

  async deletePost(id) {
    await api.delete('api/posts/' + id)
    const postInd = AppState.posts.findIndex(p => p.id === id)
    AppState.posts.splice(postInd, 1)
  }
}
export const postsService = new PostsService()
