import { createElement } from '../render';

const createFilmDetailsTemplate = () => `<section class="film-details">
<form class="film-details__inner" action="" method="get">
</form>
</section>`;

export default class FilmDetailsView {
  getTemplate() {
    return createFilmDetailsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
