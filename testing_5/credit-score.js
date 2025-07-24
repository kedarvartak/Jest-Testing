function getCreditScore(customer) {
    let score = 500;

    if (customer.income > 50000) {
        score += 100;
    }

    if (customer.hasGoodStanding) {
        score += 100;
    } else {
        score -= 200;
    }

    if (customer.age > 60) {
        score += 50;
    }

    return score;
}

module.exports = { getCreditScore }; 