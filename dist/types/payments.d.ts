export type SupportedCurrency = 'USD' | 'EUR' | 'GBP';
export type PaymentObj = {
    id: string;
    paymentDate: string;
    email: string;
    customerName: string;
    countryCode: string;
    amount: number;
    currency: SupportedCurrency;
    description: string;
    status: string;
    isSubscription: boolean;
    platform: 'stripe' | 'paypal';
};
export type PaypalTransaction = {
    transaction_info: {
        transaction_id: string;
        transaction_initiation_date: string;
        transaction_subject: string;
        transaction_status: string;
        paypal_reference_id_type: string;
        transaction_event_code: string;
        transaction_amount: {
            value: string;
            currency_code: SupportedCurrency;
        };
    };
    cart_info: {
        item_details?: Array<unknown>;
    };
    payer_info: {
        email_address: string;
        payer_name: {
            alternate_full_name?: string;
        };
        country_code: string;
    };
    shipping_info: {
        name: string;
    };
};
export declare const isPayPalAppDonation: (transactionData: PaypalTransaction) => string | false | 0 | undefined;
export declare const loadPayPalPaymentRecord: (id: string, transactionData: PaypalTransaction) => PaymentObj;
export type StripeChargeData = {
    created: number;
    amount: number;
    currency: 'usd' | 'gbp' | 'eur';
    statement_descriptor: string;
    status: string;
    billing_details: {
        email?: string;
        name?: string | undefined;
        address: {
            country: string;
        };
    };
    invoice?: {
        customer_email: string;
        customer_name: string;
        lines: {
            data: Array<{
                description: string;
                type: string;
            }>;
        };
    };
    receipt_email?: string;
};
type TimestampStatic = {
    fromMillis(ms: number): {
        toDate(): Date;
    };
};
export declare const loadStripePaymentRecord: (id: string, chargeData: StripeChargeData, Timestamp: TimestampStatic) => PaymentObj;
export {};
//# sourceMappingURL=payments.d.ts.map