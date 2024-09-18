export enum ExternalUrls {
  TERMS_OF_SERVICE = "https://bridge.financial/terms-of-service",
}

export const externalUrls = {
  ...ExternalUrls,
};

/**
 * Enum defining the base routes for the application.
 * These routes are used as the fundamental building blocks of the application's routing structure.
 *
 * @enum {string}
 */
export enum BaseRoutes {
  ROOT = "/",
  AUTH = "/auth",
  PORTAL = "/portal",
  VALUATION_ESTIMATE = "/valuation-estimate",
}

/**
 * Enum defining the authentication-related routes.
 * These routes are specific to user authentication processes like login, signup, password reset, etc.
 *
 * @enum {string}
 */
export enum AuthRoutes {
  LOGIN = "/auth/login",
  SIGN_UP = "/auth/sign-up/",
  PASSWORD_RESET = "/auth/password-reset",
  VERIFY_EMAIL = "/auth/verify-email",
  VERIFY_EMAIL_SENT = "/auth/verify-email-sent",
}

/**
 * Enum defining the portal-related routes.
 * These routes are specific to the portal section of the application, which might include user dashboards, settings, etc.
 *
 * @enum {string}
 */
export enum PortalRoutes {
  DASHBOARD = "/portal/dashboard",
  BLUEPRINT = "/portal/blueprint",
  DOCUMENTS = "/portal/documents",
  SETTINGS = "/portal/settings",
  BUSINESS_HEALTH = "/portal/business-health",
}

/**
 * Enum defining the questionnaire routes.
 */
export enum QuestionnaireRoutes {
  VALUATION = "/q/valuation",
  RECOMMENDATION = "/q/recommendations",
}

/**
 * Enum defining the survey onboarding routes.
 */
export enum SurveyRoutes {
  CHIROPRACTOR_SURVEY = `/q/chiropractor-valuation`,
}

/**
 * Object combining all the route paths from BaseRoutes, AuthRoutes, and PortalRoutes.
 * This consolidated object provides a single source of truth for all route paths in the application.
 *
 * @constant
 * @type {Record<string, string>}
 */
export const routePaths = {
  ...BaseRoutes,
  ...AuthRoutes,
  ...PortalRoutes,
  ...QuestionnaireRoutes,
};

/**
 * Type alias for the keys of the BaseRoutes enum.
 * Represents all possible route keys defined in the BaseRoutes enum.
 *
 * @type {keyof typeof BaseRoutes}
 */
type BaseRouteKeys = keyof typeof BaseRoutes;

/**
 * Type alias for the keys of the AuthRoutes enum.
 * Represents all possible route keys defined in the AuthRoutes enum.
 *
 * @type {keyof typeof AuthRoutes}
 */
type AuthRouteKeys = keyof typeof AuthRoutes;

/**
 * Type alias for the keys of the PortalRoutes enum.
 * Represents all possible route keys defined in the PortalRoutes enum.
 *
 * @type {keyof typeof PortalRoutes}
 */
type PortalRouteKeys = keyof typeof PortalRoutes;

/**
 * Type representing all possible route keys from BaseRoutes, AuthRoutes, and PortalRoutes.
 * This union type ensures that any route used in the application is valid and defined.
 *
 * @type {BaseRouteKeys | AuthRouteKeys | PortalRouteKeys}
 */
export type ApplicationRoutes = BaseRouteKeys | AuthRouteKeys | PortalRouteKeys;
