import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data
  }
}
export const postsService = new PostsService()
