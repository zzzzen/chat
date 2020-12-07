import {Router} from 'express';
import {authenticate} from 'passport';
import {getByCategoryId, create, update, remove} from '../controllers/position';

export const positionRouter = Router();

positionRouter.get('/:categoryId', authenticate('jwt', {session: false}), getByCategoryId);

positionRouter.post('/', authenticate('jwt', {session: false}), create);

positionRouter.patch('/:id', authenticate('jwt', {session: false}), update);

positionRouter.delete('/:id', authenticate('jwt', {session: false}), remove);
