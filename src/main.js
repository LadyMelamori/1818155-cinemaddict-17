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
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const presenter = new Presenter(siteMainElement, siteFooterElement, filmsModel, commentsModel);

render(new UserRankView(), siteHeaderElement);
render(new FilmCountView(), siteFooterStatElement);

presenter.init();
