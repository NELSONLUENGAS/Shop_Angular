import { Router} from 'express';
import { createRole, getRoles,updateRoleById, enableRoleById, deleteRoleById } from '../Controllers/Roles';
const router : Router = Router();

router.post('/', createRole);
router.get('/', getRoles);
router.put('/:id', updateRoleById);
router.delete('/:id', deleteRoleById);
router.put('/enable/:id', enableRoleById); 

export default router;