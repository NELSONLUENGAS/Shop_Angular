import { Router} from 'express';
import { createUser, getUsers, getUserById, updateUserById, enableUserById, deleteUserById, updateUserRolById } from '../Controllers/Users';
import { upload } from '../Controllers/Upload';
import { Login } from '../Controllers/Login';
const router : Router = Router();

router.get('/', getUsers);
router.post('/register', createUser);
router.post('/login', Login)
router.get('/:id', getUserById);
router.put('/:id', upload.single('avatar'), updateUserById);
router.delete('/:id', deleteUserById);
router.put('/enable/:id', enableUserById);
router.put('/rol/:id', updateUserRolById);

export default router;