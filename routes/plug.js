const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Plug = require('../models/Plug.js');

// End point ต่างๆ
// เรียกดุข้อมูลทั้งหมด
router.get('/', async (req, res, next) => {
    try {
        const products = await Plug.find().exec();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

// เขียนข้อมูล
router.post('/', async (req, res, next) => {
    console.log(req.body);
    try {
        const post = await Plug.create(req.body);
        res.json(post);
    } catch (err) {
        next(err);
    }
});

// เรียกดูข้อมูลโดย ID 
router.get('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const products = await Plug.findById(productId).exec();

        if(!Plug){
            return res.status(404).json({ error: 'Plug not found'});
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
        const updatedPlug = await Plug.findByIdAndUpdate(
            productId,
            req.body,
            { new: true }
        ).exec();

        if (!updatedPlug) {
            return res.status(404).json({ error: 'Plug not found' });
        }

        res.json(updatedPlug);
    } catch (err) {
        next(err);
    }
});


// ลบข้อมูล
router.delete('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const updatedPlug = await Plug.findByIdAndDelete(
            productId,
            req.body,
            { new: true }
        ).exec();

        if (!updatedPlug) {
            return res.status(404).json({ error: 'Plug not found' });
        }

        res.json(updatedPlug);
    } catch (err) {
        next(err);
    }
});


module.exports = router;

