/* eslint-disable no-console */
import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentsService {
  async getComments(postId) {
    const res = await api.get('api/posts/' + postId + '/comments')
    AppState.comments[postId] = res.data
  }

  async createComment(comment) {
    const res = await api.post('api/comments', comment)
    console.log(res)
    AppState.comments.push(res.data)
  }
}

export const commentsService = new CommentsService()
