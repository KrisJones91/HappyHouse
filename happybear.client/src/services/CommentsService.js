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

  async deleteComment(id) {
    await api.delete('api/comments/' + id)
    const cIndex = AppState.comments.findIndex(c => c.id === id)
    AppState.comments.splice(cIndex, 1)
  }
}

export const commentsService = new CommentsService()
