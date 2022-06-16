import { createElement } from '../render';

const createFilmDetailsTemplate = () => `<section class="film-details">
<form class="film-details__inner" action="" method="get">
</form>
</section>`;

export default class FilmDetailsView {
  #element = null;

  get template() {
    return createFilmDetailsTemplate();
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
