import { BASE_URL } from '@/services/authorized-request.service';
import { ReactNode } from 'react';

export type CreateCheckoutSessionVariables = {
  productKey: 'certified_valuation';
  successUrl?: string;
  cancelUrl?: string;
};

type CheckoutFormProps = {
  children?: ReactNode;
} & CreateCheckoutSessionVariables;

/**
 * Use this CheckoutForm, and render a button with type 'submit' in order to create a button that redirects
 * to the hosted Checkout page.
 */
const CheckoutForm = ({
  productKey,
  successUrl,
  cancelUrl,
  children,
}: CheckoutFormProps) => {
  return (
    <form method="post" action={`${BASE_URL}/api/create-checkout-session/`}>
      <input type="hidden" name="product_key" value={productKey}></input>
      {successUrl && (
        <input type="hidden" name="success_url" value={successUrl}></input>
      )}
      {cancelUrl && (
        <input type="hidden" name="cancel_url" value={cancelUrl}></input>
      )}
      {children}
    </form>
  );
};

export default CheckoutForm;
