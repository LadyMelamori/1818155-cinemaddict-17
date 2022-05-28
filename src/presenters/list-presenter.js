import FilmCardView from '../view/film-card';
import FilmListView from '../view/film-list';
import FilmsView from '../view/films';
import FiltersView from '../view/filters';
import ShowMoreButtonView from '../view/show-more-button';
import SortView from '../view/sort';
import { render}  from '../render';

export default class ListPresenter {
  filmsComponent = new FilmsView();
  filmListComponent = new FilmListView();

  init = (filmsContainer, filmsModel, commentsModel) => {
    this.filmsContainer = filmsContainer;
    this.films = [...filmsModel.getFilms()];
    this.comments = [...commentsModel.getComments()];

    render(new FiltersView(), this.filmsContainer);
    render(new SortView(), this.filmsContainer);
    render(this.filmsComponent, this.filmsContainer);
    render(this.filmListComponent, this.filmsComponent.getElement());

    const cardsContainer = this.filmListComponent.getElement().querySelector('.films-list__container');

    for (let i = 0; i < this.films.length; i++) {
      const film = this.films[i];
      const filmComments = this.comments.filter((x) => x.filmId === film.id);
      render(new FilmCardView(film, filmComments), cardsContainer);
    }

    render(new ShowMoreButtonView(), this.filmListComponent.getElement());
  };
}
