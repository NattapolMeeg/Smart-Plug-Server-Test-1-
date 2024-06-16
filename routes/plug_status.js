const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Plug_Status = require('../models/Plug_Status.js');

// End point ต่างๆ
// เรียกดุข้อมูลทั้งหมด
router.get('/', async (req, res, next) => {
    try {
        const products = await Plug_Status.find().exec();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

// เขียนข้อมูล
router.post('/', async (req, res, next) => {
    console.log(req.body);
    try {
        const post = await Plug_Status.create(req.body);
        res.json(post);
    } catch (err) {
        next(err);
    }
});

// เรียกดูข้อมูลโดย ID 
router.get('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const products = await Plug_Status.findById(productId).exec();

        if(!Plug_Status){
            return res.status(404).json({ error: 'Plug_Status not found'});
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
        const updatedPlug = await Plug_Status.findByIdAndUpdate(
            productId,
            req.body,
            { new: true }
        ).exec();

        if (!updatedPlug) {
            return res.status(404).json({ error: 'Plug_Status not found' });
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
        const updatedPlug = await Plug_Status.findByIdAndDelete(
            productId,
            req.body,
            { new: true }
        ).exec();

        if (!updatedPlug) {
            return res.status(404).json({ error: 'Plug_Status not found' });
        }

        res.json(updatedPlug);
    } catch (err) {
        next(err);
    }
});


module.exports = router;

