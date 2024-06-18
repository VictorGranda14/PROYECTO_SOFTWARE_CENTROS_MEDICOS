import { Router } from 'express';
import { getExamenes, getExamen, postExamen, putExamen, deleteExamen } from '../controllers/examen';
import { upload } from '../middlewares/multer';

const router = Router();

router.get('/', getExamenes);
router.get('/:idExamen', getExamen);
router.delete('/:idExamen', deleteExamen);
router.post('/', upload, postExamen);
router.put('/:idExamen', upload, putExamen);

export default router;