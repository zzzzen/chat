import {Router} from 'express';
import {authenticate} from 'passport';
import {upload} from '../middlewares/upload';
import {getAll, getById, remove, create, update} from '../controllers/category';

export const categoryRouter = Router();

categoryRouter.get('/', authenticate('jwt', {session: false}), getAll);

categoryRouter.get('/:id', authenticate('jwt', {session: false}), getById);

categoryRouter.delete('/:id', authenticate('jwt', {session: false}), remove);

categoryRouter.post('/', authenticate('jwt', {session: false}), upload.single('image'), create);

categoryRouter.patch('/:id', authenticate('jwt', {session: false}), upload.single('image'), update);
