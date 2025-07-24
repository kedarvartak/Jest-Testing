const { getCreditScore } = require('./credit-score');

describe('getCreditScore', () => {
    test('gives a base score for a standard customer', () => {
        const customer = {
            income: 40000,
            hasGoodStanding: true,
            age: 45,
        };
        // Expected: 500 (base) + 100 (good standing) = 600
        expect(getCreditScore(customer)).toBe(600);
    });

    test('penalizes customers with bad standing', () => {
        const customer = {
            income: 40000,
            hasGoodStanding: false,
            age: 45,
        };
        // Expected: 500 (base) - 200 (bad standing) = 300
        expect(getCreditScore(customer)).toBe(300);
    });
}); 