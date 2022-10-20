require('dotenv').config();
const { User, Payment } = require("../../db.js");
const { HOST_EMAIL, PORT_EMAIL, EMAIL, EMAIL_PASS, DB_HOST, DB_PORT } = process.env;
const { paymentNotification } = require('./notifications/notifications')
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.js");
const Stripe = require('stripe')

const stripe = new Stripe('sk_test_51LpumKJocvWwgusfR19jzAn2K6nOtr99mMwbcQpJUMWLvPOZPlQozetO9hdsLp95i29WyTO7o7Kvv7IQHLZoqqAx00S5mMHbOv')


const changeToPremium = async (userEmail, userName, paymentMethod) =>{



    try {

      const customer = await stripe.customers.create({
        email: userEmail,
        name: userName,
        payment_method: paymentMethod,
        invoice_settings: { default_payment_method: paymentMethod }
      })

      const product = await stripe.products.create({
        name: 'Monthly subscription',
      })

      const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "USD",
            product: product.id,
            unit_amount: "500",
            recurring: {
              interval: "month",
            },
          },
        },
      ],

      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
        expand: ["latest_invoice.payment_intent"],
    });
    // console.log('ESTOOO',subscription)
    const user = await User.findOne({where:{email: userEmail}})
    const newToken = jwt.sign({ user: user }, authConfig.secret, {
      expiresIn: authConfig.expires,
    });
    // console.log('sos vos?¡',user)
    const factura = await Payment.create({
      paymenthID: subscription.id,
    })
    
    //console.log('facturaa',factura)
    await user.addPayment(factura)
    user.update({ premium: true })
    user.update({ logged: true });
          setTimeout(function () {
            user.update({ logged: false });
          }, 5000);

    // console.log(subscription.latest_invoice.invoice_pdf)
    const recibo = subscription.latest_invoice.invoice_pdf
    paymentNotification(userEmail,recibo)
    
    
    
    return {
      message: 'Subscription successfully initiated',
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id,
      token: newToken,
      user: user.dataValues,
    }

    } catch(error) {
        console.log('Change to premium error',error);
        return JSON.stringify({ message: error.message });
    }
}


module.exports = {
    changeToPremium,

}