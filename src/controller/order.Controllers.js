// const order = require('../model/order.model.js');
// const User = require('../model/user.js');

// // Create a new order
// const createOrder = async (req, res) => {
//     try {
//         const { userId, items, totalAmount } = req.body;
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const newOrder = new order({
//             user: userId,
//             books: items,
//             totalPrice: totalAmount
//         });
//         const savedOrder = await newOrder.save();
//         res.status(201).json(savedOrder);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const getSingleOrder = async (req, res) => {
//     try{
//         const orderId = req.params.id;
//         const order = await Order.findById(orderId).populate('user').populate('books.book');
//         res.status(200).json(order);

//         return res.status(200).json({
//             success: true,
//             order
//         });
//     }
//     catch(err){
//         return res.status(500).json({
//             success : false,
//             message : 'Error fetching order' + err.message,
//         })
//     }
// }





// module.exports = {
//     createOrder,
//     getSingleOrder
// };