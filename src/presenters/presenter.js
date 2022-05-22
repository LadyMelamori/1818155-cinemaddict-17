import FilmCardView from '../view/film-card.js';
import FilmListView from '../view/film-list.js';
import FilmsView from '../view/films.js';
import FiltersView from '../view/filters.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort.js';
import {render} from '../render.js';

export default class Presenter {
  filmsComponent = new FilmsView();
  filmListComponent = new FilmListView();

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(new FiltersView(), this.filmsContainer);
    render(new SortView(), this.filmsContainer);
    render(this.filmsComponent, this.filmsContainer);
    render(this.filmListComponent, this.filmsComponent.getElement());

    const cardsContainer = this.filmListComponent.getElement().querySelector('.films-list__container');

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), cardsContainer);
    }

    render(new ShowMoreButtonView(), this.filmListComponent.getElement());
  };
}
