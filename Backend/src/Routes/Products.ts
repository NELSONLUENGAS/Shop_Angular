import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProductById, updateProductStockById, enableProductById, deleteProductById } from '../Controllers/Products';
import { upload } from '../Controllers/Upload';
const router : Router = Router();

router.post('/', upload.single('image'), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', upload.single('image'), updateProductById);
router.delete('/:id', deleteProductById);
router.put('/enable/:id', enableProductById);
router.put('/stock/:id', updateProductStockById);

export default router;