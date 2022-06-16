import FilmCardView from '../view/film-card';
import FilmListView from '../view/film-list';
import FilmsView from '../view/films';
import FiltersView from '../view/filters';
import ShowMoreButtonView from '../view/show-more-button';
import SortView from '../view/sort';
import FilmDetailsView from '../view/film-details';
import FilmDetailsInfoView from '../view/film-details-info';
import FilmDetailsCommentListView from '../view/film-details-comment-list';
import FilmDetailsCommentView from '../view/film-details-comment';
import { render, RenderPosition }  from '../render';

export default class Presenter {
  #filmsContainer = null;
  #detailsContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  #films = [];
  #comments = [];

  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmDetailsComponent = null;

  init = (filmsContainer, detailsContainer, filmsModel, commentsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#detailsContainer = detailsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];

    render(new FiltersView(), this.#filmsContainer);
    render(new SortView(), this.#filmsContainer);
    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmListComponent, this.#filmsComponent.element);

    this.#renderFilmCards();

    render(new ShowMoreButtonView(), this.#filmListComponent.element);
  };

  #renderFilmDetailsComponent = (film) => {
    this.#filmDetailsComponent = new FilmDetailsView();

    const detailsInnerContainer = this.#filmDetailsComponent.element.querySelector('.film-details__inner');
    render(new FilmDetailsInfoView(film), detailsInnerContainer);

    const filmComments = this.#comments.filter((x) => x.filmId === film.id);
    const commentListComponent = new FilmDetailsCommentListView(filmComments);

    render(commentListComponent, detailsInnerContainer);

    const commentsContainer = commentListComponent.element.querySelector('.film-details__comments-list');

    for (let i = 0; i < filmComments.length; i++) {
      render(new FilmDetailsCommentView(filmComments[i]), commentsContainer);
    }

    render(this.#filmDetailsComponent, this.#detailsContainer, RenderPosition.AFTEREND);
  };

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent = null;
  };

  #renderFilmCards = () => {
    const cardsContainer = this.#filmListComponent.element.querySelector('.films-list__container');

    for (let i = 0; i < this.#films.length; i++) {
      const film = this.#films[i];
      const filmComments = this.#comments.filter((x) => x.filmId === film.id);
      const cardComponent = new FilmCardView(film, filmComments);
      render(cardComponent, cardsContainer);
    }

    const showPopup = (film) => {
      this.#renderFilmDetailsComponent(film);

      const body = document.querySelector('body');
      body.classList.add('hide-overflow');
    };

    const closePopup = () => {
      this.#removeFilmDetailsComponent();

      const body = document.querySelector('body');
      body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    cardsContainer.addEventListener('click', (evt) => {
      const cardElement = evt.target.closest('.film-card');

      if (cardElement) {
        const filmId = parseInt(cardElement.dataset.filmId, 10);
        const film = this.#films.find((x) => x.id === filmId);
        showPopup(film);

        document.addEventListener('keydown', onEscKeyDown);

        this.#filmDetailsComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
          closePopup();
          document.removeEventListener('keydown', onEscKeyDown);
        });
      }
    });
  };
}
