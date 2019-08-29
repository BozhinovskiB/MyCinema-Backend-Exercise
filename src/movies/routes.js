import { Router } from 'express';
import actions from './actions';

const { create, list, get, del, update} = actions;
 
const userRouter = Router();

userRouter.post('/movies', create);
userRouter.get('/movies', list);
userRouter.get('/movies/:id', get);
userRouter.delete('/movies/:id', del);
// userRouter.put('/movies/:id', update);



export default userRouter;
