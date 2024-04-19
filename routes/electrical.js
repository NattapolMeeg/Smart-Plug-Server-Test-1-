const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Electrical = require('../models/EEbill.js');

// End point ต่างๆ
// เรียกดุข้อมูลทั้งหมด
router.get('/', async (req, res, next) => {
    try {
        const products = await Electrical.find().exec();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

// เขียนข้อมูล
router.post('/', async (req, res, next) => {
    console.log(req.body);
    try {
        const post = await Electrical.create(req.body);
        res.json(post);
    } catch (err) {
        next(err);
    }
});

// เรียกดูข้อมูลโดย ID 
router.get('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const products = await Electrical.findById(productId).exec();

        if(!Electrical){
            return res.status(404).json({ error: 'Electrical not found'});
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
        const updatedElectrical = await Electrical.findByIdAndUpdate(
            productId,
            req.body,
            { new: true }
        ).exec();

        if (!updatedElectrical) {
            return res.status(404).json({ error: 'Electrical not found' });
        }

        res.json(updatedElectrical);
    } catch (err) {
        next(err);
    }
});


// ลบข้อมูล
router.delete('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const updatedElectrical = await Electrical.findByIdAndDelete(
            productId,
            req.body,
            { new: true }
        ).exec();

        if (!updatedElectrical) {
            return res.status(404).json({ error: 'Electrical not found' });
        }

        res.json(updatedElectrical);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
