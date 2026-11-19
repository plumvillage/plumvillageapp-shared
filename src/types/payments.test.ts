// These interpret the charges stored by the plumvillage-firebase Stripe import, for donor claims, admin and the CRM
import { isStripeSubscriptionCharge, loadStripePaymentRecord, type StripeChargeData } from './payments.js';

describe('isStripeSubscriptionCharge', () => {
  const chargeWithLine = (line: object | null) => ({
    invoice: line ? { lines: { data: [line] } } : null,
  }) as unknown as StripeChargeData;

  it.each([
    ['pre-basil subscription line', { type: 'subscription' }, true],
    ['pre-basil recurring line', { type: 'recurring' }, true],
    ['basil subscription line', { parent: { type: 'subscription_item_details' } }, true],
    ['pre-basil invoice item line', { type: 'invoiceitem' }, false],
    ['basil invoice item line', { parent: { type: 'invoice_item_details' } }, false],
    ['one-off charge without invoice', null, false],
  ])('%s', (_, line, expected) => {
    expect(isStripeSubscriptionCharge(chargeWithLine(line))).toBe(expected);
  });
});

describe('loadStripePaymentRecord payment method and paid currency', () => {
  const Timestamp = { fromMillis: (ms: number) => ({ toDate: () => new Date(ms) }) };
  const charge = (extra: object) => ({
    created: 1795025343,
    amount: 500,
    currency: 'usd',
    statement_descriptor: '',
    status: 'succeeded',
    billing_details: { email: 'donor@example.com', name: 'Donor', address: { country: 'NL' } },
    invoice: null,
    ...extra,
  }) as unknown as StripeChargeData;

  it.each([
    ['card in our currency', { payment_method_details: { type: 'card' } }, 'card', undefined, undefined],
    ['iDEAL paid in EUR', {
      payment_method_details: { type: 'ideal' },
      presentment_details: { presentment_amount: 474, presentment_currency: 'eur' },
    }, 'ideal', 4.74, 'EUR'],
    ['presentment in our own currency', {
      payment_method_details: { type: 'card' },
      presentment_details: { presentment_amount: 500, presentment_currency: 'usd' },
    }, 'card', undefined, undefined],
    ['paid in a currency without minor units', {
      payment_method_details: { type: 'card' },
      presentment_details: { presentment_amount: 790, presentment_currency: 'jpy' },
    }, 'card', 790, 'JPY'],
    ['older charge without payment method details', {}, '', undefined, undefined],
  ])('%s', (_, extra, paymentMethod, paidAmount, paidCurrency) => {
    const payment = loadStripePaymentRecord('py_1', charge(extra), Timestamp);

    expect(payment).toMatchObject({ amount: 5, currency: 'USD', paymentMethod });
    expect(payment.paidAmount).toBe(paidAmount);
    expect(payment.paidCurrency).toBe(paidCurrency);
  });
});
