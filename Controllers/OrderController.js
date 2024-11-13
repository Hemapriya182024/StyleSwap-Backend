import orderModel from '../Models/OrderModel.js'
import userModel from '../Models/UserModel.js';
//Placing order using COD

const placeOrder = async (req, res) => {
    try {

        const { userId, items, address, amount } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            status: "Order Placed",
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,  {cartData : {}});

        res.json({
            success: true,
            message: "Order Placed"

        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })

    }

}

//Placing order using stripe

const placeOrderStripe = async (req, res) => {
    try {

    } catch (error) {

    }


}

//Placing order using Razorpay

const placeOrderRazorpay = async (req, res) => {
    try {

    } catch (error) {

    }


}

//All orders data for admin panel 
const allOrders = async (req, res) => {
    try {
        const orders=await orderModel.find({})
        res.json({
            success:true,
            orders
        })

    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })

    }


}

//User Order data for Frontend
const userOrders = async (req, res) => {
    try {
        const {userId}=req.body
        const orders= await orderModel.find({userId})
        res.json({
            success:true,
            orders
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })


    }


}

//update order status from Admin panel

const updateStatus = async (req, res) => {
    try {
    const {orderId,status}=req.body
    await orderModel.findByIdAndUpdate(orderId ,{status})
    res.json({
        success:true,
        message:'Status Updated'
    })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })


    }


}


export { placeOrder, allOrders, updateStatus, userOrders, placeOrderRazorpay, placeOrderStripe }



