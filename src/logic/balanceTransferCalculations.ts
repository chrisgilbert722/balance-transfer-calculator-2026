export interface BalanceTransferInput {
    currentBalance: number;
    currentAPR: number;
    newAPR: number;
    monthlyPayment: number;
    transferFeePercent: number;
}

export interface BalanceTransferResult {
    interestSavings: number;
    netSavings: number;
    transferFee: number;
    originalTotalInterest: number;
    newTotalInterest: number;
    originalPayoffMonths: number;
    newPayoffMonths: number;
    originalTotalPaid: number;
    newTotalPaid: number;
    currentBalance: number;
    currentAPR: number;
    newAPR: number;
    monthlyPayment: number;
    canPayOffOriginal: boolean;
    canPayOffNew: boolean;
    savingsMessage: string;
}

function calculatePayoff(balance: number, apr: number, monthlyPayment: number): { months: number; totalInterest: number; canPayOff: boolean } {
    const monthlyRate = apr / 100 / 12;
    let remaining = balance;
    let totalInterest = 0;
    let months = 0;
    const maxMonths = 600;

    // Check if payment covers first month interest
    const firstMonthInterest = remaining * monthlyRate;
    const canPayOff = monthlyPayment > firstMonthInterest || apr === 0;

    if (!canPayOff || balance <= 0 || monthlyPayment <= 0) {
        return { months: maxMonths, totalInterest: firstMonthInterest * maxMonths, canPayOff: false };
    }

    while (remaining > 0.01 && months < maxMonths) {
        const monthInterest = remaining * monthlyRate;
        totalInterest += monthInterest;
        remaining += monthInterest;
        const payment = Math.min(monthlyPayment, remaining);
        remaining -= payment;
        months++;
    }

    return { months, totalInterest, canPayOff: months < maxMonths };
}

export function calculateBalanceTransfer(input: BalanceTransferInput): BalanceTransferResult {
    const currentBalance = Math.max(0, input.currentBalance);
    const currentAPR = Math.max(0, Math.min(100, input.currentAPR));
    const newAPR = Math.max(0, Math.min(100, input.newAPR));
    const monthlyPayment = Math.max(0, input.monthlyPayment);
    const transferFeePercent = Math.max(0, Math.min(10, input.transferFeePercent));

    // Calculate transfer fee
    const transferFee = currentBalance * (transferFeePercent / 100);

    // New balance after transfer includes the fee
    const newBalance = currentBalance + transferFee;

    // Calculate original payoff
    const originalPayoff = calculatePayoff(currentBalance, currentAPR, monthlyPayment);

    // Calculate new payoff (with transfer fee added to balance)
    const newPayoff = calculatePayoff(newBalance, newAPR, monthlyPayment);

    // Calculate savings
    const interestSavings = originalPayoff.totalInterest - newPayoff.totalInterest;
    const netSavings = interestSavings - transferFee;

    const originalTotalPaid = currentBalance + originalPayoff.totalInterest;
    const newTotalPaid = newBalance + newPayoff.totalInterest;

    // Generate savings message
    let savingsMessage: string;
    if (currentBalance === 0) {
        savingsMessage = 'Enter a balance to calculate savings';
    } else if (monthlyPayment === 0) {
        savingsMessage = 'Enter a monthly payment';
    } else if (!originalPayoff.canPayOff) {
        savingsMessage = 'Payment does not cover current interest';
    } else if (!newPayoff.canPayOff) {
        savingsMessage = 'Payment does not cover new interest';
    } else if (netSavings > 0) {
        savingsMessage = 'Transfer may result in interest savings';
    } else if (netSavings < 0) {
        savingsMessage = 'Transfer may cost more than keeping current card';
    } else {
        savingsMessage = 'Savings approximately break even with transfer fee';
    }

    return {
        interestSavings,
        netSavings,
        transferFee,
        originalTotalInterest: originalPayoff.totalInterest,
        newTotalInterest: newPayoff.totalInterest,
        originalPayoffMonths: originalPayoff.months,
        newPayoffMonths: newPayoff.months,
        originalTotalPaid,
        newTotalPaid,
        currentBalance,
        currentAPR,
        newAPR,
        monthlyPayment,
        canPayOffOriginal: originalPayoff.canPayOff,
        canPayOffNew: newPayoff.canPayOff,
        savingsMessage
    };
}
