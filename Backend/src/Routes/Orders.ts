import { Router} from 'express';
import { createOrder, getOrders, getOrdersByUser, updateOrderStatusById, deleteOrderById, PostSessionCheckout } from '../Controllers/Orders';
const router : Router = Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.put('/:id', updateOrderStatusById);
router.delete('/:id', deleteOrderById);
router.get('/user/:id', getOrdersByUser);
router.post('/create-session-checkout', PostSessionCheckout);

export default router;