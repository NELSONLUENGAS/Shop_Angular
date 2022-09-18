import { Router} from 'express';
import { createBrand, getBrands, updateBrandById, deleteBrandById, enableBrandById, getBrandById  } from '../Controllers/Brand';
import { upload } from '../Controllers/Upload';
const router : Router = Router();

router.post('/', upload.single('icon'), createBrand);
router.get('/', getBrands);
router.get('/:id', getBrandById);
router.put('/:id', upload.single('icon'), updateBrandById);
router.delete('/:id', deleteBrandById);
router.put('/enable/:id', enableBrandById);

export default router;