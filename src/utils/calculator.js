
export const calculateCompoundInterest = ({
    initialAmount,
    monthlyContribution,
    duration,
    interestRate,
    interestType,
    timeUnit,
    capitalization,
}) => {
    const result = [];
    const months = timeUnit === "years" ? duration * 12 : duration;
    const monthlyRateDecimal = timeUnit === "years"
        ? Math.pow(1 + interestRate / 100, 1 / 12) - 1
        : interestRate / 100;
    const capFreqMap = { monthly: 1, bimonthly: 2, quarterly: 3, yearly: 12 };
    const capEvery = capFreqMap[capitalization] || 1;
    let totalValue = initialAmount;
    let totalInvested = initialAmount;

    for (let month = 1; month <= months; month++) {
        totalInvested = initialAmount + monthlyContribution * month;
        if (interestType === "compound") {
            if (month % capEvery === 0) {
                totalValue *= (1 + monthlyRateDecimal);
            }
            totalValue += monthlyContribution;
        } else {
            const interest = (initialAmount * monthlyRateDecimal * month) / capEvery;
            const contribInterest = ((monthlyContribution * (month * (month + 1))) / 2) * (monthlyRateDecimal / capEvery);
            totalValue = totalInvested + interest + contribInterest;
        }
        result.push({
            month,
            totalValue: parseFloat(totalValue.toFixed(2)),
            totalInvested: parseFloat(totalInvested.toFixed(2)),
        });
    }
    result.interestType = interestType;
    return result;
};
