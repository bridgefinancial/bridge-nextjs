import { BASE_URL } from '@/services/authorized-request.service';
import { routePaths } from '@/types/routes.enum';
import { baseUrls } from '@/utils/env-variables';
import { ReactNode } from 'react';

export enum ProductKey {
  CertifiedValuation = 'certified_valuation',
  OptimizationPackage = 'optimization_package',
  SellerReadinessPackage = 'seller_readiness_package',
}

export type CreateCheckoutSessionVariables = {
  productKey: ProductKey;
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
  let defaultSuccessUrl: string = '/';
  let defaultCancelUrl: string = '/';

  switch (productKey) {
    case ProductKey.CertifiedValuation:
      defaultSuccessUrl = `${routePaths.CERTIFIED_VALUATION_SUCCESS}?celebrate=t`;
      defaultCancelUrl = `${routePaths.CERTIFIED_VALUATION}`;
      break;
    case ProductKey.OptimizationPackage:
      defaultSuccessUrl = `${routePaths.OPTIMIZATION_PACKAGE_SUCCESS}?celebrate=t`;
      defaultCancelUrl = `${routePaths.OPTIMIZATION_PACKAGE}`;
      break;
    case ProductKey.SellerReadinessPackage:
      defaultSuccessUrl = `${routePaths.SELLER_READINESS_PACKAGE_SUCCESS}?celebrate=t`;
      defaultCancelUrl = `${routePaths.SELLER_READINESS_PACKAGE}`;
  }
  return (
    <form method="post" action={`${BASE_URL}/api/create-checkout-session/`}>
      <input type="hidden" name="product_key" value={productKey}></input>
      {(successUrl || defaultSuccessUrl) && (
        <input
          type="hidden"
          name="success_url"
          value={`${baseUrls.web.full}${successUrl ?? defaultSuccessUrl}`}
        ></input>
      )}
      {(cancelUrl || defaultCancelUrl) && (
        <input
          type="hidden"
          name="cancel_url"
          value={`${baseUrls.web.full}${cancelUrl ?? defaultCancelUrl}`}
        ></input>
      )}
      {children}
    </form>
  );
};

export default CheckoutForm;
