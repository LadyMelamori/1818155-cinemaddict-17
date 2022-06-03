import FilmCountView from './view/film-count';
import UserRankView from './view/user-rank';
import { render } from './render';
import Presenter from './presenters/presenter';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatElement = siteFooterElement.querySelector('.footer__statistics');
const presenter = new Presenter();
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

render(new UserRankView(), siteHeaderElement);
render(new FilmCountView(), siteFooterStatElement);

presenter.init(siteMainElement, siteFooterElement, filmsModel, commentsModel);
