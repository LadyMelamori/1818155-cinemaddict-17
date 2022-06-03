import { createElement } from '../render';
import { getDateYear, humanizeRuntime, shortenDescription } from '../utils';

const createFilmCardTemplate = (film, comments) => `<article class="film-card" data-film-id=${film.id}>
<a class="film-card__link">
  <h3 class="film-card__title">${film.title}</h3>
  <p class="film-card__rating">${film.totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${getDateYear(film.release.date)}</span>
    <span class="film-card__duration">${humanizeRuntime(film.runtime)}</span>
    <span class="film-card__genre">${film.genre.length ? film.genre[0] : ''}</span>
  </p>
  <img src="./${film.poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${shortenDescription(film.description)}</p>
  <span class="film-card__comments">${comments.length} comments</span>
</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
</div>
</article>`;

export default class FilmCardView {
  #element = null;
  #film = null;
  #comments = null;

  constructor(film, comments) {
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmCardTemplate(this.#film, this.#comments);
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
