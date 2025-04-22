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

    const monthlyRate = timeUnit === "years"
        ? (Math.pow(1 + interestRate / 100, 1 / 12) - 1) * 100
        : interestRate;

    const capFreqMap = {
        monthly: 1,
        bimonthly: 2,
        quarterly: 3,
        yearly: 12,
    };
    const capEvery = capFreqMap[capitalization] || 1;

    let totalValue = initialAmount;
    let totalInvested = initialAmount;

    for (let month = 1; month <= months; month++) {
        totalInvested = initialAmount + monthlyContribution * month;

        if (interestType === "compound") {
            if (month % capEvery === 0) {
                totalValue = totalValue * (1 + monthlyRate / 100);
            }
            totalValue += monthlyContribution;
        } else if (interestType === "simple") {
            const interest = (initialAmount * (monthlyRate / 100) * month) * (1 / capEvery);
            const contribInterest = (monthlyContribution * (month * (month + 1)) / 2) * (monthlyRate / 100) * (1 / capEvery);
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
