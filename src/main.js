import FilmCountView from './view/film-count';
import UserRankView from './view/user-rank';
import { render } from './render';
import ListPresenter from './presenters/list-presenter';
import DetailsPresenter from './presenters/details-presenter';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatElement = siteFooterElement.querySelector('.footer__statistics');
const listPresenter = new ListPresenter();
const detailsPresenter = new DetailsPresenter();
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

render(new UserRankView(), siteHeaderElement);
render(new FilmCountView(), siteFooterStatElement);

listPresenter.init(siteMainElement, filmsModel, commentsModel);
detailsPresenter.init(siteFooterElement, filmsModel, commentsModel);
