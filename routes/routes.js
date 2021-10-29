const { Router } = require('express'),
    router = Router(),
    { model, Schema } = require('mongoose'),
    ProductSchema = new Schema({
        productName: {
            type: String,
            required: true,
            maxlength: '20',
        },
        productPrice: {
            type: Number,
            required: true,
            min: 5,
            max: 3500,
        }
    }),
    Product = model('apple_product', ProductSchema);

router.get('/', (req, res) => {
    return res.render('index')
})

router.get('/products', (req, res) => {
    Product.find({})
        .then(docs => {
            res.send({ docs })
        })
        .catch(err => {
            throw new Error(err);
        })
})

router.post('/search', async (req, res) => {

    let payload = req.body.payload;

    if (!payload) {
        return res.status(200).send({ payload: null })
    }

    try {

        let search = await Product.find(
            { productName: { $regex: new RegExp('^' + payload + '.*', 'i') } }
        ).limit(5).exec();

        return res.status(200).send(search)

    } catch (error) {
        throw new Error(error)
    }

})

module.exports = router;