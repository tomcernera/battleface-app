module.exports = {
    calculateGrandTotal: function (fixed_rate, ages, start_date, end_date) {
        let grand_total = 0;
        ages.forEach(age => {
            grand_total += this.calculateTotal(fixed_rate, age, start_date, end_date);
        });
        return grand_total;
    },
    calculateTotal: function (fixed_rate, age, start_date, end_date) {
        const ageLoad = this.getAgeLoad(age);
        const tripLength = this.calculateTripLength(start_date, end_date);
        return Math.round(fixed_rate * ageLoad * tripLength);
    },
    calculateTripLength: function (start_date, end_date) {
        return 1 + (Date.parse(end_date) - Date.parse(start_date)) / (24 * 3600 * 1000);
    },
    getAgeLoad: function (age) {
        if (age < 18 || age > 70) {
            return 0; // document under 18 and over 70
        } else if (age < 31) {
            return 0.6;
        } else if (age < 41) {
            return 0.7;
        } else if (age < 51) {
            return 0.8;
        } else if (age < 61) {
            return 0.9;
        } else {
            return 1;
        }
    },
    generateQuoateId: function () {
        return Math.round(new Date().getTime() * Math.random());
    }
}