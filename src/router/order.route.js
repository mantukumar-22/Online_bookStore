// const express = require('express');


// const { addOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../controller/order.Cont.js');
// const { authMiddleware, authorizeRole} = require('../middleware/auth.middleware.js');
// const router = express.Router();


// router.post('/add', authMiddleware, authorizeRole(['admin']), addOrder);
// router.get('/allorders', authMiddleware, authorizeRole(['admin']), getAllOrders);
// router.get('/:id', authMiddleware, authorizeRole(['admin']), getOrderById);
// router.put('/:id', authMiddleware, authorizeRole(['admin']), updateOrder);
// router.delete('/:id', authMiddleware, authorizeRole(['admin']), deleteOrder);

// router.get('/allorders', authMiddleware, authorizeRole(['user']), getAllOrders);
// router.get('/:id', authMiddleware, authorizeRole(['user']), getOrderById);
// router.put('/:id', authMiddleware, authorizeRole(['user']), updateOrder);
// router.delete('/:id', authMiddleware, authorizeRole(['user']), deleteOrder);





// module.exports = router;