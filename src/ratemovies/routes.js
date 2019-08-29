import { Router } from 'express';
import actions from './actions';

const {create, list, get, del} = actions;
 
const userRouter = Router();

userRouter.post('/ratemovies', create);
userRouter.get('/ratemovies', list);
userRouter.get('/ratemovies/:id', get);
userRouter.delete('/ratemovies/:id', del);
// userRouter.put('/ratemovies/:id', update);



export default userRouter;
