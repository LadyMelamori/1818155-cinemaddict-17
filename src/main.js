import FilmCountView from './view/film-count.js';
import FilmDetailsView from './view/film-details.js';
import UserRankView from './view/user-rank.js';
import {render} from './render.js';
import Presenter from './presenters/presenter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatElement = siteFooterElement.querySelector('.footer__statistics');
const presenter = new Presenter();

render(new UserRankView(), siteHeaderElement);
render(new FilmCountView(), siteFooterStatElement);
//render(new FilmDetailsView(), siteFooterElement);

presenter.init(siteMainElement);
