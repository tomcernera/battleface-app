const express = require('express');
const router = express.Router();
const validator = require('../helpers/validators');
const quotation_service = require('../services/quotation');

const fixed_rate = 3;

router.post('/', (req, res) => {
 try {
     let ages = req.body.age.split(",");
     let currency_id = req.body.currency_id;
     let start_date = req.body.start_date;
     let end_date = req.body.end_date;
     if (validator.isValidAges(ages) 
        && validator.isValidCurrency(currency_id)
        && validator.isValidDate(start_date)
        && validator.isValidDate(end_date) 
        && validator.isValidTripLength(start_date, end_date)){
         let total = 0;
         ages.forEach(age => {
             total += quotation_service.calculateTotal(fixed_rate, age, start_date, end_date);
         });
         const quotation_id = quotation_service.generateQuoateId();
         if (total > 0) {
             const payload = {
                 total: total,
                 currency_id: currency_id,
                 quotation_id: quotation_id
             };
             res.status(200).send(payload);
         } else {
             const payload = {
                 error: "Check input for valid ages and dates."
             }
             res.status(400).send(payload);
         }
     } else {
        if (!validator.isValidAges(ages)) {
            const payload = {
                error: "Please send valid ages as a comma separated list of insureds’ ages. First value must be 18 or over. 0 is not a valid age."
            };
            res.status(400).send(payload);
         } else if (!validator.isValidCurrency(currency_id)) {
            const payload = {
                error: "Please send valid currency in ISO 4217 format."
            };
            res.status(400).send(payload);
         }else if (!validator.isValidDate(start_date) || !validator.isValidDate(end_date)) {
            const payload = {
                error: "Please send valid date in ISO 8601 format 'YYYY-MM-DD'."
            };
            res.status(400).send(payload);
         } else if (validator.isValidTripLength(start_date, end_date)) {
            const payload = {
                error: "Start date must be before end date."
            };
            res.status(400).send(payload);
         } else {
            const payload = {
                error: "Please send valid post request"
            };
            res.status(400).send(payload);
         }
     }
 } catch (error) {
    console.log(error);
    const payload = {
        error: "Something went wrong."
    };
    res.status(500).send(payload);
 }
});

module.exports = router;