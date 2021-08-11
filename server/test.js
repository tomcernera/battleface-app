const { it, expect } = require('@jest/globals');
const validators = require('./helpers/validators');
const quotation_service = require('./services/quotation');

//Validators
it('Check username is greater than 5 characters', () => {
    const username_long = 'battleface';
    const username_short = 'bf';
    expect(validators.isValidUsername(username_long)).toBeTruthy();
    expect(validators.isValidUsername(username_short)).toBeFalsy();
});

it('Check password is greater than 5 characters', () => {
    const password_long = 'battleface';
    const password_short = 'bf';
    expect(validators.isValidPassword(password_long)).toBeTruthy();
    expect(validators.isValidPassword(password_short)).toBeFalsy();
});

it('Check first age is over 18 and values are provided', () => {
    let ages = [12, 18, 55];
    expect(validators.isValidAges(ages)).toBeFalsy();
    ages.shift();
    expect(validators.isValidAges(ages)).toBeTruthy();
    ages = [];
    expect(validators.isValidAges(ages)).toBeFalsy();
});

it('Check ages under 18 and over 70', () => {
    let ages = [71, 17];
    expect(validators.isValidAges(ages)).toBeFalsy();
})

it('Check for valid currency code', () => {
    let currency_id = 'USD';
    expect(validators.isValidCurrency(currency_id)).toBeTruthy();
    let bad_currency = "zzz";
    expect(validators.isValidCurrency(bad_currency)).toBeFalsy();
});

it('Check valid date', () => {
    let good_date = '2020-10-01';
    let bad_date = 'abc-01-11';
    expect(validators.isValidDate(good_date)).toBeTruthy();
    expect(validators.isValidDate(bad_date)).toBeFalsy();
});

it('Check start date is before end date', () => {
    let start_date = '2020-10-01';
    let end_date = '2020-10-30';
    expect(validators.isValidTripLength(start_date, end_date)).toBeTruthy();
    expect(validators.isValidTripLength(end_date, start_date)).toBeFalsy();
});

it('Should calculate trip length inclusive of start and end dates', () => {
    expect(quotation_service.calculateTripLength('2020-10-01', '2020-10-30')).toBe(30);
});

it('Should return age load according to table', () => {
    expect(quotation_service.getAgeLoad(18)).toBe(0.6);
    expect(quotation_service.getAgeLoad(33)).toBe(0.7);
    expect(quotation_service.getAgeLoad(44)).toBe(0.8);
    expect(quotation_service.getAgeLoad(56)).toBe(0.9);
    expect(quotation_service.getAgeLoad(8)).toBe(0);
    expect(quotation_service.getAgeLoad(66)).toBe(1);
})

it('Should generate quoate id', () => {
    expect(quotation_service.generateQuoateId()).toBeGreaterThan(0);
});

it('Should calcuate grand total', () => {
    let ages = [28, 35];
    let start_date = "2020-10-01";
    let end_date = "2020-10-30";
    expect(quotation_service.calculateGrandTotal(3, ages, start_date, end_date)).toBe(117);
})