import React from 'react';
import type { BalanceTransferInput } from '../logic/balanceTransferCalculations';

interface ScenarioControlsProps {
    values: BalanceTransferInput;
    onChange: (field: keyof BalanceTransferInput, value: number | boolean) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const balanceOptions = [
        { label: '$2,500', value: 2500 },
        { label: '$5,000', value: 5000 },
        { label: '$10,000', value: 10000 },
        { label: '$15,000', value: 15000 },
    ];

    const newAprOptions = [
        { label: '0%', value: 0 },
        { label: '5%', value: 5 },
        { label: '10%', value: 10 },
        { label: '15%', value: 15 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Balance Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Balance</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {balanceOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('currentBalance', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.currentBalance === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.currentBalance === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.currentBalance === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* New APR Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>New APR</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {newAprOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('newAPR', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.newAPR === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.newAPR === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.newAPR === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
