export const isPayPalAppDonation = (transactionData) => {
    // PayPal may be used for purposes other than donations.
    // Exclude items which are not PV App donations
    return parseFloat(transactionData.transaction_info.transaction_amount.value) > 0
        && transactionData.cart_info.item_details && transactionData.cart_info.item_details.length
        && transactionData.payer_info.email_address;
};
export const loadPayPalPaymentRecord = (id, transactionData) => ({
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
export const loadStripePaymentRecord = (id, chargeData, Timestamp) => ({
    id,
    paymentDate: Timestamp.fromMillis(chargeData.created * 1000).toDate().toISOString(),
    email: chargeData.billing_details.email || chargeData.invoice?.customer_email || chargeData.receipt_email || '',
    customerName: chargeData.billing_details.name || chargeData.invoice?.customer_name || '',
    countryCode: chargeData.billing_details.address.country,
    amount: chargeData.amount / 100,
    currency: chargeData.currency.toUpperCase(),
    description: (chargeData.invoice && chargeData.invoice.lines.data[0].description)
        || chargeData.statement_descriptor,
    status: chargeData.status,
    isSubscription: Boolean(chargeData.invoice
        && ['subscription', 'recurring'].includes(chargeData.invoice.lines.data[0].type)),
    platform: 'stripe',
});
