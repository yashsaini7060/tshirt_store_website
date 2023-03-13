const stripe = require("stripe")("sk_test_51HbR32CICGeU5sKXnAZhULFjArlB8TzaTCX5GunTH6nJT1LqdbodPB9pXWIIIh8B5k8e0WTkqHe01dc6RkrtKMR300RXEcHuLr")
const uuid = require("uuid/v4")


exports.makepayment = (req, res) => {

    const {products, token} = req.body;
    console.log("PRODUCTS", products);
    let amount = 0;
    products.map(p => {
        amount = amount + p.price;
    });

    const idempotencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            recipt_email: token.email,
            shipping: {
                name: token.card.name
            }
        }, {idempotencyKey})
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
    });

};