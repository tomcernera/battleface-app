const currency_codes = require('./currency_codes.json');

module.exports = {
    isValidUsername: function (username) {
        return username.length > 5;
    },
    isValidPassword : function (password) {
        return password.length > 5;
    },
    isValidAges: function (ages) {
        if (ages.length < 1 || ages[0] < 18) return false;
        return ages.every(age => !isNaN(age) && (age >= 18 && age <= 70));
    },
    isValidCurrency: function (currency_id) {
        const currency = currency_id.toUpperCase();
        return currency_codes.includes(currency);
    },
    isValidDate: function (date) {
        const split_date = date.split("-")
        const year = split_date[0];
        const month = split_date[1];
        const day = split_date[2];
        if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
        const formattedDate = new Date(date);
        return !isNaN(formattedDate.getTime());
    },
    isValidTripLength: function (start_date, end_date) {
        return (Date.parse(start_date) < Date.parse(end_date));
    }
}