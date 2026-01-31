import React from 'react';
import type { BalanceTransferInput } from '../logic/balanceTransferCalculations';

interface InputCardProps {
    values: BalanceTransferInput;
    onChange: (field: keyof BalanceTransferInput, value: number | boolean) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Current Balance */}
                <div>
                    <label htmlFor="currentBalance">Current Balance ($)</label>
                    <input
                        type="number"
                        id="currentBalance"
                        value={values.currentBalance}
                        onChange={(e) => onChange('currentBalance', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="100"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your current credit card balance to transfer
                    </span>
                </div>

                {/* Current APR */}
                <div>
                    <label htmlFor="currentAPR">Current APR (%)</label>
                    <input
                        type="number"
                        id="currentAPR"
                        value={values.currentAPR}
                        onChange={(e) => onChange('currentAPR', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.01"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your current card's annual interest rate
                    </span>
                </div>

                {/* New APR */}
                <div>
                    <label htmlFor="newAPR">New APR (%)</label>
                    <input
                        type="number"
                        id="newAPR"
                        value={values.newAPR}
                        onChange={(e) => onChange('newAPR', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.01"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        The new card's APR (often 0% for promotional periods)
                    </span>
                </div>

                {/* Monthly Payment */}
                <div>
                    <label htmlFor="monthlyPayment">Monthly Payment ($)</label>
                    <input
                        type="number"
                        id="monthlyPayment"
                        value={values.monthlyPayment}
                        onChange={(e) => onChange('monthlyPayment', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="25"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        The amount you plan to pay each month
                    </span>
                </div>

                {/* Transfer Fee */}
                <div>
                    <label htmlFor="transferFeePercent">Transfer Fee (%)</label>
                    <input
                        type="number"
                        id="transferFeePercent"
                        value={values.transferFeePercent}
                        onChange={(e) => onChange('transferFeePercent', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="10"
                        step="0.5"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Balance transfer fee (typically 3-5% of the balance)
                    </span>
                </div>
            </div>
        </div>
    );
};
