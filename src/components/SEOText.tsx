import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This balance transfer savings calculator provides estimated interest savings when
                transferring credit card balances to a lower APR card. Calculations include transfer
                fees and assume consistent monthly payments throughout the payoff period. These
                figures are estimates only and actual savings will depend on promotional period
                length, post-promotional APR, and payment behavior. This calculator is for
                informational purposes and does not constitute financial guidance.
            </p>
        </div>
    );
};
