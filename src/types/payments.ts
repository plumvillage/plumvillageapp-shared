export type SupportedCurrency = 'USD' | 'EUR' | 'GBP';

export type PaymentObj = {
  id: string,
  paymentDate: string,
  email: string,
  customerName: string,
  countryCode: string,
  amount: number,
  currency: SupportedCurrency,
  description: string,
  status: string,
  isSubscription: boolean,
  platform: 'stripe' | 'paypal',
};


export type PaypalTransaction = {
  transaction_info: {
    transaction_id: string,
    transaction_initiation_date: string,
    transaction_subject: string,
    transaction_status: string,
    paypal_reference_id_type: string, // As of October 2024 transactions no longer show "SUB" for subscriptions
    transaction_event_code: string, // As of October 2024 we can check this field for "T0002" for subscriptions
    transaction_amount: {
      value: string;
      currency_code: SupportedCurrency,
    }
  },
  cart_info: {
    item_details?: Array<unknown>,
  },
  payer_info: {
    email_address: string,
    payer_name: {
      alternate_full_name?: string,
    },
    country_code: string,
  },
  shipping_info: {
    name: string,
  }
};

export const isPayPalAppDonation = (transactionData: PaypalTransaction) => {
  // PayPal may be used for purposes other than donations.
  // Exclude items which are not PV App donations
  return parseFloat(transactionData.transaction_info.transaction_amount.value) > 0
        && transactionData.cart_info.item_details && transactionData.cart_info.item_details.length
        && transactionData.payer_info.email_address;
};

export const loadPayPalPaymentRecord = (id: string, transactionData: PaypalTransaction): PaymentObj => ({
  id,
  paymentDate: transactionData.transaction_info.transaction_initiation_date,
  email: transactionData.payer_info.email_address,
  customerName: transactionData.payer_info.payer_name.alternate_full_name
        || transactionData.shipping_info.name,
  countryCode: transactionData.payer_info.country_code,
  amount: parseFloat(transactionData.transaction_info.transaction_amount.value),
  currency: transactionData.transaction_info.transaction_amount.currency_code,
  description: transactionData.transaction_info.transaction_subject,
  status: transactionData.transaction_info.transaction_status,
  isSubscription: transactionData.transaction_info.paypal_reference_id_type === 'SUB' || transactionData.transaction_info.transaction_event_code === 'T0002',
  platform: 'paypal',
});

export type StripeChargeData = { 
  created: number,
  amount: number,
  currency: 'usd' | 'gbp' | 'eur',
  statement_descriptor: string,
  status: string,
  billing_details: {
    email?: string,
    name?: string | undefined,
    address: {
      country: string,
    }
  },
  invoice?: {
    customer_email: string,
    customer_name: string,
    lines: {
      data: Array<{
        description: string,
        type: string,
      }>,
    },
  }
  receipt_email?: string,
};

type TimestampStatic = {
  fromMillis(ms: number): { toDate(): Date };
};

export const loadStripePaymentRecord = (id: string, chargeData: StripeChargeData, Timestamp: TimestampStatic): PaymentObj => ({
  id,
  paymentDate: Timestamp.fromMillis(chargeData.created * 1000).toDate().toISOString(),
  email: chargeData.billing_details.email || chargeData.invoice?.customer_email || chargeData.receipt_email || '',
  customerName: chargeData.billing_details.name || chargeData.invoice?.customer_name || '',
  countryCode: chargeData.billing_details.address.country,
  amount: chargeData.amount / 100,
  currency: chargeData.currency.toUpperCase() as 'USD' | 'GBP' | 'EUR',
  description: (chargeData.invoice && chargeData.invoice.lines.data[0].description)
        || chargeData.statement_descriptor,
  status: chargeData.status,
  isSubscription: Boolean(chargeData.invoice
        && ['subscription', 'recurring'].includes(chargeData.invoice.lines.data[0].type)),
  platform: 'stripe',
});