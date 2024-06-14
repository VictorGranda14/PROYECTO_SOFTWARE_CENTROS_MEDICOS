import { Router } from 'express';
import { deleteHistoria, getHistoria, getHistorias, postHistoria, putHistoria } from '../controllers/historia';

const router = Router();

router.get('/', getHistorias);
router.get('/:idHistoria', getHistoria);
router.delete('/:idHistoria', deleteHistoria);
router.post('/', postHistoria);
router.put('/:idHistoria', putHistoria);

export default router;