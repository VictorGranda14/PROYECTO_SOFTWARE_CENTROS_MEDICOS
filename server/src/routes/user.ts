import { Router } from 'express'
import { loginUser, newUser, getFuncionarios } from '../controllers/user';

const router = Router();

router.post('/', newUser)
router.post('/login', loginUser)

router.get('/', getFuncionarios)
export default router;