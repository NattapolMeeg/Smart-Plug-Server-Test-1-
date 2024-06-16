const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Battery = require('../models/Battery.js');

// End point ต่างๆ
// เรียกดุข้อมูลทั้งหมด
router.get('/', async (req, res, next) => {
    try {
        const products = await Battery.find().exec();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

// เขียนข้อมูล
router.post('/', async (req, res, next) => {
    console.log(req.body);
    try {
        const post = await Battery.create(req.body);
        res.json(post);
    } catch (err) {
        next(err);
    }
});

// เรียกดูข้อมูลโดย ID 
router.get('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const products = await Battery.findById(productId).exec();

        if(!Battery){
            return res.status(404).json({ error: 'Battery not found'});
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
        const updatedBattery = await Battery.findByIdAndUpdate(
            productId,
            req.body,
            { new: true }
        ).exec();

        if (!updatedBattery) {
            return res.status(404).json({ error: 'Battery not found' });
        }

        res.json(updatedBattery);
    } catch (err) {
        next(err);
    }
});


// ลบข้อมูล
router.delete('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const updatedBattery = await Battery.findByIdAndDelete(
            productId,
            req.body,
            { new: true }
        ).exec();

        if (!updatedBattery) {
            return res.status(404).json({ error: 'Battery not found' });
        }

        res.json(updatedBattery);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
