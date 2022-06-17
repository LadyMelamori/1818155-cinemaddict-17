import { createElement } from '../render';

const createFilmListHeaderTemplate = () => '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';

export default class FilmListHeaderView {
  #element = null;

  get template() {
    return createFilmListHeaderTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
