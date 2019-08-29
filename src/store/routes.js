import { Router } from 'express';
import actions from './actions';

const {create, list, get, del, update} = actions;
 
const userRouter = Router();

// userRouter.post('/store', create);
userRouter.get('/store', list);
userRouter.get('/store/:id', get);
// userRouter.delete('/store/:id', del);
// userRouter.put('/store/:id', update);



export default userRouter;
