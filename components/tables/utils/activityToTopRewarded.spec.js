import { describe, it, expect } from 'vitest';
import activityToTopRewarded from '../utils/activityToTopRewarded';

describe('activityToTopRewarded', () => {
    const mockActivity = [
        {
            bidRefundsRank: 1,
            usdcAmounts: {
                bidRefundReceived: "100",
            },
            displayAddr: "0x1234",
            nbRefunds: 5,
            chainId: 11155111,
            currenciesAmounts: {
                "0x123": {
                    bidRefundReceived: "100",
                }
            }
        },
        {
            bidRefundsRank: 2,
            usdcAmounts: {
                bidRefundReceived: "50",
            },
            displayAddr: "0x5678",
            nbRefunds: 3,
            chainId: 11155111,
            // No currenciesAmounts provided here
        }
    ];

    it('should format activity data correctly', () => {
        const result = activityToTopRewarded(mockActivity);
        expect(result).toEqual([
            {
                rank: 1,
                totalReceived: "100",
                address: "0x1234",
                refunds: 5,
                chainId: 11155111,
                details: [
                    {
                        currency: "0x123",
                        totalReceived: "100",
                    }
                ],
            },
            {
                rank: 2,
                totalReceived: "50",
                address: "0x5678",
                refunds: 3,
                chainId: 11155111,
                details: []
            }
        ]);
    });
});
