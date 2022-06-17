import FilmCardView from '../view/film-card';
import FilmListView from '../view/film-list';
import FilmListHeaderView from '../view/film-list-header';
import FilmListContainerView from '../view/film-list-container';
import NoFilmView from '../view/no-film';
import FilmsView from '../view/films';
import FiltersView from '../view/filters';
import ShowMoreButtonView from '../view/show-more-button';
import SortView from '../view/sort';
import FilmDetailsView from '../view/film-details';
import FilmDetailsInfoView from '../view/film-details-info';
import FilmDetailsCommentListView from '../view/film-details-comment-list';
import FilmDetailsCommentView from '../view/film-details-comment';
import { render, RenderPosition }  from '../render';

const FILM_COUNT_PER_STEP = 5;

export default class Presenter {
  #filmsContainer = null;
  #detailsContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #comments = [];

  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmDetailsComponent = null;

  #showMoreButtonComponent = new ShowMoreButtonView();

  init = (filmsContainer, detailsContainer, filmsModel, commentsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#detailsContainer = detailsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];

    render(new FiltersView(), this.#filmsContainer);

    if (this.#films.length) {
      render(new SortView(), this.#filmsContainer);
    }

    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmListComponent, this.#filmsComponent.element);
    if (this.#films.length) {
      render(new FilmListHeaderView(), this.#filmListComponent.element);
      render(new FilmListContainerView(), this.#filmListComponent.element);

      this.#renderFilmCards();

      if (this.#films.length > FILM_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, this.#filmListComponent.element);

        this.#showMoreButtonComponent.element.addEventListener('click', this.#handleShowMoreButtonClick);
      }
    } else {
      render(new NoFilmView(), this.#filmListComponent.element);
    }
  };

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();

    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilmCard(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
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

  #renderFilmCard = (film) => {
    const cardsContainer = this.#filmListComponent.element.querySelector('.films-list__container');

    const filmComments = this.#comments.filter((x) => x.filmId === film.id);
    const cardComponent = new FilmCardView(film, filmComments);
    render(cardComponent, cardsContainer);
  };

  #renderFilmCards = () => {
    for (let i = 0; i < Math.min(this.#films.length, FILM_COUNT_PER_STEP); i++) {
      const film = this.#films[i];
      this.#renderFilmCard(film);
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

    const cardsContainer = this.#filmListComponent.element.querySelector('.films-list__container');

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
