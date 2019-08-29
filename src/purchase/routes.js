import { Router } from 'express';
import actions from './actions';

const { create, list, get, del, update } = actions;
 
const userRouter = Router();

userRouter.post('/purchase', create);
userRouter.get('/purchase', list);
userRouter.get('/purchase/:id', get);
userRouter.delete('/purchase/:id', del);
// userRouter.put('/purchase/:id', update);



export default userRouter;
