import { Router } from 'express';
import { deleteCita, getCita, getCitas, postCita, putCita } from '../controllers/cita';

const router = Router();

router.get('/', getCitas);
router.get('/:idCita', getCita);
router.delete('/:idCita', deleteCita);
router.post('/', postCita);
router.put('/:idCita', putCita);

export default router;