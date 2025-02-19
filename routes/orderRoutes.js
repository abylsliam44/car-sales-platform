const express = require('express');
const { protect, roleCheck } = require('../middleware/authMiddleware');
const { createOrder, getMyOrders, deleteOrder, confirmOrder, getAllOrders, cancelOrder, removeOrder } = require('../controllers/orderController'); // ✅ Должно быть!

const router = express.Router();

router.get('/', protect, roleCheck(['admin']), getAllOrders);
router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.delete('/:id', protect, deleteOrder);
router.put('/:id/confirm', protect, roleCheck(['admin']), confirmOrder);
router.put('/:id/cancel', protect, roleCheck(['admin']), cancelOrder);
router.delete('/:id/remove', protect, roleCheck(['admin']), removeOrder); 

module.exports = router;
