const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product.js');

// End point ต่างๆ
// เรียกดุข้อมูลทั้งหมด
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find().exec();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

// เขียนข้อมูล
router.post('/', async (req, res, next) => {
    console.log(req.body);
    try {
        const post = await Product.create(req.body);
        res.json(post);
    } catch (err) {
        next(err);
    }
});

// เรียกดูข้อมูลโดย ID 
router.get('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const products = await Product.findById(productId).exec();

        if(!Product){
            return res.status(404).json({ error: 'Product not found'});
        }

        res.json(products);
    } catch (err) {
        next(err);
    }
});

// อัพเดทข้อมูลตาม ID ของข้อมูล
router.put('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true }
        ).exec();

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
});


// ลบข้อมูล
router.delete('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const updatedProduct = await Product.findByIdAndDelete(
            productId,
            req.body,
            { new: true }
        ).exec();

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
