const express = require('express');
const Razorpay = require('razorpay');
require("dotenv").config();

const app = express();
const PORT = 5000;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.post("/order",async (req,res) => {
  try{
    const razorpay = new Razorpay({
      key_id : process.env.RAZORPAY_KEY_ID,
      key_secret : process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);
    console.log(order);

    if(!order){
      
      return res.status(500).send(err);
    }
    res.json(order);
  }catch(err){
    console.error('Error creating Razorpay order:', err);
    res.status(500).send("Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






