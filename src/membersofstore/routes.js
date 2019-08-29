import { Router } from 'express';
import actions from './actions';

const {create, list, get} = actions;
 
const userRouter = Router();

userRouter.post('/membersofstore', create);
userRouter.get('/membersofstore', list);
userRouter.get('/membersofstore/:id', get);
// userRouter.delete('/membersofstore/:id', del);
// userRouter.put('/membersofstore/:id', update);



export default userRouter;
