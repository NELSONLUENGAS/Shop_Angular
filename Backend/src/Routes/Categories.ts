import { Router} from 'express';
import { createCategory, getCategories, getCategoryById, updateCategoryById, enableCategoryById, deleteCategoryById } from '../Controllers/Categories';
import { upload } from '../Controllers/Upload';
const router : Router = Router();

router.post('/', upload.single('icon'), createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', upload.single('icon'), updateCategoryById);
router.delete('/:id', deleteCategoryById);
router.put('/enable/:id', enableCategoryById);

export default router;