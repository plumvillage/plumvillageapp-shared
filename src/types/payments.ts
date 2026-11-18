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
  paymentMethod: string, // e.g. card, ideal or link for Stripe, and paypal for PayPal
  // What the donor actually paid, when in a different currency from ours (Stripe Adaptive Pricing)
  paidAmount?: number,
  paidCurrency?: string,
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
  paymentMethod: 'paypal',
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
        // Older charges have only `type`, charges imported at Stripe API 2025-03-31.basil or later have only
        // `parent.type`, and those imported in between have both, as Stripe added `parent` to all API versions
        // https://docs.stripe.com/changelog/basil/2025-03-31/adds-new-parent-field-to-invoicing-objects
        type?: string,
        parent?: { type: string } | null,
      }>,
    },
  } | null,
  receipt_email?: string,
  payment_method_details?: { type: string } | null,
  // Only on charges imported since Stripe added Adaptive Pricing presentment details in 2025
  presentment_details?: { presentment_amount: number, presentment_currency: string } | null,
};

// Stripe amounts are in minor units, which some currencies (e.g. JPY) don't have
const fromStripeAmount = (amount: number, currency: string): number => amount / 10 ** (
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).resolvedOptions().maximumFractionDigits ?? 2
);

export const isStripeSubscriptionCharge = (chargeData: StripeChargeData): boolean => {
  const line = chargeData.invoice?.lines.data[0];

  return ['subscription', 'recurring'].includes(line?.type ?? '')
    || line?.parent?.type === 'subscription_item_details';
};

type TimestampStatic = {
  fromMillis(ms: number): { toDate(): Date };
};

export const loadStripePaymentRecord = (id: string, chargeData: StripeChargeData, Timestamp: TimestampStatic): PaymentObj => {
  const presentment = chargeData.presentment_details;
  const paidInOtherCurrency = presentment && presentment.presentment_currency !== chargeData.currency;

  return {
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
    isSubscription: isStripeSubscriptionCharge(chargeData),
    platform: 'stripe',
    paymentMethod: chargeData.payment_method_details?.type ?? '',
    ...(paidInOtherCurrency ? {
      paidAmount: fromStripeAmount(presentment.presentment_amount, presentment.presentment_currency),
      paidCurrency: presentment.presentment_currency.toUpperCase(),
    } : {}),
  };
};