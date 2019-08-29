import { Router } from 'express';
import users from '../users/index';
import store from '../store/index';
import ratemovies from '../ratemovies/index';
import purchase from '../purchase/index';
import movies from '../movies/index';
import membersofstore from '../membersofstore/index';

const { routes } = users;

const indexRouter = Router();

indexRouter.use(routes);
indexRouter.use(store.routes);
indexRouter.use(ratemovies.routes);
indexRouter.use(purchase.routes);
indexRouter.use(movies.routes);
indexRouter.use(membersofstore.routes);

export default indexRouter;