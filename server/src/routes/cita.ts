import { Router } from 'express';
import { getCita, getCitas, postCita, obtenerCitasPorPaciente, cancelarCita, obtenerCitasPorFuncionario } from '../controllers/cita';

const router = Router();

router.get('/', getCitas);
router.get('/:idCita', getCita);
router.post('/', postCita);
router.get('/paciente/:idPaciente', obtenerCitasPorPaciente);
router.delete('/:idCita', cancelarCita);
router.get('/funcionario/:idFuncionarioSalud', obtenerCitasPorFuncionario);

export default router;