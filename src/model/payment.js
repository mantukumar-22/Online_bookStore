const mongoose = require("mongoose");

const paymentSchema=new mongoose.Schema({

    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    paymentId:String,

    method:{
        type:String,
        enum:["COD","UPI","Card","NetBanking"]
    },

    amount:Number,

    status:{
        type:String,
        enum:["Pending","Success","Failed"],
        default:"Pending"
    }

},
{
    timestamps:true
});

const Payment = mongoose.model("Payment",paymentSchema);

module.exports = Payment;