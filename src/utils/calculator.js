export const calculateCompoundInterest = ({
    initialAmount,
    monthlyContribution,
    duration,
    interestRate,
    interestType,
    timeUnit,
}) => {
    const result = [];

    const months = timeUnit === "years" ? duration * 12 : duration;
    const monthlyRate = timeUnit === "years" ? (Math.pow(1 + interestRate / 100, 1 / 12) - 1) * 100 : interestRate;

    let totalValue = initialAmount;
    let totalInvested = initialAmount;

    for (let month = 1; month <= months; month++) {
        totalInvested = initialAmount + monthlyContribution * month;

        if (interestType === "compound") {
            totalValue = totalValue * (1 + monthlyRate / 100) + monthlyContribution;
        } else if (interestType === "simple") {
            const interest = (initialAmount * (monthlyRate / 100) * month);
            const contributionInterest = (monthlyContribution * (month * (month + 1)) / 2) * (monthlyRate / 100);
            totalValue = totalInvested + interest + contributionInterest;
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
