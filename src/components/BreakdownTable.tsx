import React from 'react';
import type { BalanceTransferResult } from '../logic/balanceTransferCalculations';

interface BreakdownTableProps {
    result: BalanceTransferResult;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
};

const formatTime = (months: number): string => {
    if (months >= 600) {
        return '50+ years';
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) {
        return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    if (remainingMonths === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
    }
    return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const originalRows = [
        { label: 'Estimated Current Balance', value: formatMoney(result.currentBalance), isTotal: false },
        { label: 'Current APR', value: `${result.currentAPR.toFixed(2)}%`, isTotal: false },
        { label: 'Estimated Original Interest Cost', value: formatMoney(result.originalTotalInterest), isTotal: false },
        { label: 'Estimated Original Payoff Time', value: formatTime(result.originalPayoffMonths), isTotal: false },
    ];

    const newRows = [
        { label: 'New APR', value: `${result.newAPR.toFixed(2)}%`, isTotal: false },
        { label: 'Estimated Transfer Fee', value: formatMoney(result.transferFee), isTotal: false },
        { label: 'Estimated New Interest Cost', value: formatMoney(result.newTotalInterest), isTotal: false },
        { label: 'Estimated New Payoff Time', value: formatTime(result.newPayoffMonths), isTotal: false },
    ];

    const savingsRows = [
        { label: 'Estimated Interest Savings', value: formatMoney(result.interestSavings), isTotal: false },
        { label: 'Transfer Fee', value: `-${formatMoney(result.transferFee)}`, isTotal: false },
        { label: 'Estimated Net Savings', value: formatMoney(result.netSavings), isTotal: true },
    ];

    const renderTable = (rows: Array<{ label: string; value: string; isTotal: boolean }>, isLast = false) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} style={{
                        borderBottom: (isLast && idx === rows.length - 1) ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {row.label}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: row.isTotal ? 700 : 400,
                            color: row.isTotal ? (result.netSavings >= 0 ? '#166534' : '#B91C1C') : 'inherit'
                        }}>
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Original Card Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Current Card Costs</h3>
            </div>
            {renderTable(originalRows)}

            {/* New Card Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F0F9FF' }}>
                <h3 style={{ fontSize: '1rem', color: '#0369A1' }}>Estimated New Card Costs</h3>
            </div>
            {renderTable(newRows)}

            {/* Savings Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: result.netSavings >= 0 ? '#F0FDF4' : '#FEF3C7' }}>
                <h3 style={{ fontSize: '1rem', color: result.netSavings >= 0 ? '#166534' : '#92400E' }}>Estimated Savings Breakdown</h3>
            </div>
            {renderTable(savingsRows, true)}
        </div>
    );
};
