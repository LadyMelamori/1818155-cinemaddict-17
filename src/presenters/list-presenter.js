import FilmCardView from '../view/film-card';
import FilmListView from '../view/film-list';
import FilmsView from '../view/films';
import FiltersView from '../view/filters';
import ShowMoreButtonView from '../view/show-more-button';
import SortView from '../view/sort';
import { render}  from '../render';

export default class ListPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  #films = [];
  #comments = [];

  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();

  init = (filmsContainer, filmsModel, commentsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];

    render(new FiltersView(), this.#filmsContainer);
    render(new SortView(), this.#filmsContainer);
    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmListComponent, this.#filmsComponent.element);

    const cardsContainer = this.#filmListComponent.element.querySelector('.films-list__container');

    for (let i = 0; i < this.#films.length; i++) {
      const film = this.#films[i];
      const filmComments = this.#comments.filter((x) => x.filmId === film.id);
      render(new FilmCardView(film, filmComments), cardsContainer);
    }

    render(new ShowMoreButtonView(), this.#filmListComponent.element);
  };
}
