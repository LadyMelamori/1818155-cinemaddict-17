import { generateComment } from '../mock/comment';

export default class CommentsModel {
  #comments = Array.from({length: 3}, generateComment);

  get comments() {
    return this.#comments;
  }
}
