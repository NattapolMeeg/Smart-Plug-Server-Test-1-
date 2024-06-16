const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Electrical = require('../models/Plug'); // Assuming this is the model for input data
const EEbill = require('../models/EEbill');
const { Energy_con } = require('../Calculation');

// Start calcualte at current = 0.15 

// Function to periodically check status and perform calculations
async function calculateAndSaveBills() {
    try {
        // const latestRecord = await Electrical.findOne({Status : true}, {Voltage : 1, Current : 1}).sort({ updated_at: -1 }).exec();
        // console.log(latestRecord);
        // if (!latestRecord) {
        //     console.log('No data found to calculate the bill.');
        //     return;
        // }

        // Fetch all electrical data with status true
        const data = await Electrical.find({ Status: true }, {Voltage : 1, Current : 1}).limit(60).exec();

        // let data = {
        //     Voltage: 227.3085175,
        //     Current: -0.024300963
        //   };
        // const CurrentData = await Electrical.find({});
        for(let record of data){
            // console.log(record);
            const { Voltage, Current } = record;
            // console.log(Voltage);
            // console.log(Current);
            const { totalEnergy, Bill } = Energy_con(Voltage, Current); // Adjust based on actual fields
            const eeBill = new EEbill({
            Unit: totalEnergy,
            eeBill: Bill,
            EEbill: Bill
            });

            await eeBill.save();
        }
        /*
        // sample of how to post the data to database
        const totalEnergy = 1200;
        const Bill = 20;
        const eeBill = new EEbill({
            Unit: totalEnergy,
            eeBill: Bill,
            EEbill: new Date()
            });
    
        await eeBill.save();
        */

        // if (data.length === 0) {
        //     console.log('No active data found to calculate the bill.');
        //     return;
        // }

        // Iterate over each record and calculate the bill
        // for (let record of data) {
        //     const { voltageReadings, currentReadings } = record;
        //     const { totalEnergy, Bill } = Energy_con(voltageReadings, currentReadings); // Adjust based on actual fields
        //     // const totalEnergy = 3000;
        //     // const Bill = 100;
        //     // Save the calculated bill to EEbill collection
        //     const eeBill = new EEbill({
        //         Unit: totalEnergy,
        //         eeBill: Bill,
        //         EEbill: new Date()
        //     });

        //     await eeBill.save();
        // }

        console.log('Electrical bills calculated and saved successfully.');
    } catch (err) {
        console.error('Error calculating and saving electrical bills:', err);
    }
}

// Schedule the function to run every minute (60000 ms)
setInterval(calculateAndSaveBills, 60000);

// Fetch all electrical data
router.get('/', async (req, res, next) => {
    try {
        const products = await EEbill.find().exec();
        res.json(products);
    } catch (err) {
        next(err);  
    }
});

// Create new electrical data
router.post('/', async (req, res, next) => {
    console.log(req.body);
    try {
        const post = await EEbill.create(req.body);
        res.json(post);
    } catch (err) {
        next(err);
    }
});

// Fetch electrical data by ID
router.get('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const products = await EEbill.findById(productId).exec();

        if (!products) {
            return res.status(404).json({ error: 'EEbill not found'});
        }

        res.json(products);
    } catch (err) {
        next(err);
    }
});

// Update electrical data by ID
router.put('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const updatedElectrical = await EEbill.findByIdAndUpdate(
            productId,
            req.body,
            { new: true }
        ).exec();

        if (!updatedElectrical) {
            return res.status(404).json({ error: 'EEbill not found' });
        }

        res.json(updatedElectrical);
    } catch (err) {
        next(err);
    }
});

// Delete electrical data by ID
router.delete('/:id', async (req, res, next) => {
    const productId = req.params.id;

    try {
        const updatedElectrical = await EEbill.findByIdAndDelete(
            productId,
            req.body,
            { new: true }
        ).exec();

        if (!updatedElectrical) {
            return res.status(404).json({ error: 'EEbill not found' });
        }

        res.json(updatedElectrical);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
