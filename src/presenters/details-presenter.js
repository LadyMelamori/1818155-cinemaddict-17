import FilmDetailsView from '../view/film-details';
import FilmDetailsInfoView from '../view/film-details-info';
import FilmDetailsCommentListView from '../view/film-details-comment-list';
import FilmDetailsCommentView from '../view/film-details-comment';
import { render, RenderPosition } from '../render';

export default class DetailsPresenter {
  #detailsContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  #films = [];
  #comments = [];

  #filmDetailsComponent = new FilmDetailsView();

  init = (detailsContainer, filmsModel, commentsModel) => {
    this.#detailsContainer = detailsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];

    const film = this.#films[0];
    const filmComments = this.#comments.filter((x) => x.filmId === film.id);

    render(this.#filmDetailsComponent, this.#detailsContainer, RenderPosition.AFTEREND);

    const detailsInnerContainer = this.#filmDetailsComponent.element.querySelector('.film-details__inner');

    render(new FilmDetailsInfoView(film), detailsInnerContainer);

    const commentListComponent = new FilmDetailsCommentListView(filmComments);

    render(commentListComponent, detailsInnerContainer);

    const commentsContainer = commentListComponent.element.querySelector('.film-details__comments-list');

    for (let i = 0; i < filmComments.length; i++) {
      render(new FilmDetailsCommentView(filmComments[i]), commentsContainer);
    }
  };
}
