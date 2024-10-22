import { JSX } from 'react';
import { FieldType } from './forms.enum';

export type FormDefinition = {
  id: number | string;
  name: string;
  pages: Page[];
  review?: boolean;

  // Deprecate in favor of conditions
  sections?: Section[];
};

export type ContactInfo = {
  contact_name: string;
  contact_email: string;
  contact_phone: string;
};

export type CompanyAddress = {
  zip: string;
  city: string;
  line1: string;
  state: string;
};

export type TaxInfo = {
  fein: string;
  tax_class: string;
  duns_number: number;
};

export type LegalInfo = {
  entity_type: string;
  business_name: string;
};

export type OtherInfo = {
  industry: string;
  website_url: string;
};

export type Accounting = {
  total_assets: number;
  has_real_estate: string;
  total_liabilities: number;
};

export type BusinessMetrics = {
  owner_count: number;
  customer_count: number;
  employee_count: number;
};

export type AnnualFinancials = {
  annual_profit: number;
  annual_revenue: number;
  annual_revenue_growth: number;
};

export type QualifyingQuestions = {
  is_non_profit: string;
  is_publicly_traded: string;
  has_outstanding_disputes: string;
};

export type Buyers = {
  has_potential_buyers: string;
  has_preferred_buyers: string;
};

export type Willing = {
  earn_out: boolean;
  non_compete: boolean;
  seller_financing: boolean;
  provide_transition_support: boolean;
};

export type ObstaclesToSell = {
  other: {
    value: boolean;
    textbox: string;
  };
  bad_market: boolean;
  worthy_buyer: boolean;
  confidentiality: boolean;
  personal_finance: boolean;
  tax_implications: boolean;
  legal_implications: boolean;
  valuation_uncertainty: boolean;
  financial_documentation: boolean;
};

export type TargetSellingPrice = {
  max_price: number;
  min_price: number;
};

export type DesiredOutcomes = {
  buyers: Buyers;
  willing: Willing;
  sell_by_date: string;
  obstacles_to_sell: ObstaclesToSell;
  reason_for_selling: string;
  target_selling_price: TargetSellingPrice;
};

export type BusinessDetailFormSubmission = {
  contact_info: {
    contact_info: ContactInfo;
    company_address: CompanyAddress;
    position_or_title: string;
    is_owner_or_officer: string;
  };
  business_info: {
    tax_info: TaxInfo;
    dba_names: string[];
    legal_info: LegalInfo;
    other_info: OtherInfo;
    is_state_registered: string;
    business_description: string;
    owner_management_type: string;
    is_operating_outside_united_states: string;
  };
  financial_info: {
    accounting: Accounting;
    business_metrics: BusinessMetrics;
    annual_financials: AnnualFinancials;
    qualifying_questions: QualifyingQuestions;
  };
  desired_outcomes: DesiredOutcomes;
};

export type FormSubmission = {
  id: number;
  json_blob: Record<string, unknown>;
  user: string;
  form: number;
};

export type FormsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: FormidableForm[];
};

export type FormIntro = {
  imageSrc: string;
  welcomeHeading?: string;
  heading: string;
  subheading: string;
  buttonText?: string;
  timeEstimate?: string;
};

export type FormidableForm = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  review: boolean;
  definition: FormDefinition;
  intro?: FormIntro;
};

export type ConditionOperator =
  | 'equal'
  | 'not_equal'
  | 'greater_than'
  | 'greater_than_or_equal'
  | 'less_than'
  | 'less_than_or_equal';

export type Condition = {
  dependant_on: {
    name: string;
    page_name?: string;
    parent_name?: string;
  };
  value: string;
  operator: string; // using ConditionOperator is causing type errors
};

// Deprecate in favor of conditions
export type Section = {
  name: string;
  fields: string[];
};

export type Page = {
  name: string;
  header?: string | (() => JSX.Element);

  fields: FormField[];
  conditions?: Condition[];

  // Deprecate in favor of conditions
  disabled?: boolean;
  hidden?: boolean;
};

export type FormField = {
  id: number;
  name: string;
  page?: string;
  parent?: string;
  label: string;
  type: FieldType;
  required?: boolean;
  order?: number;
  readonly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  conditions?: Condition[];

  hint?: string;
  help_text?: string;
  placeholder?: string;
  max_length?: number;
  min_length?: number;
  max?: number;
  min?: number;
  enum?: {
    label: string;
    value: unknown;
    textbox?: boolean;
    placeholder?: string;
    iconUrl?: string;

    // Deprecate
    activates?: string;
    displays?: string;
    disabled?: boolean;
    hidden?: boolean;
  }[];
  value?: unknown; // unsupported
  internal_fields?: FormField[];
  pattern?: FieldPattern;
  validator?: CustomValidator; // unsupported
  clean?: CleanType[] | string[]; // unsupported
  add_more?: boolean;
  not_sure?: boolean;
  accepted_file_types?: string;
  autocomplete?: string;

  // Deprecate in favor of conditions
  activates?: string;
  displays?: string;
};

export type FieldPattern = {
  value: RegExp;
  message: string; // Error message
};

// can use: number, string, date with form "yyyy-mm-dd" OR "today"
export type CustomValidator = {
  validatorName: CustomValidatorType | string;
  value: unknown;
  message: string; // Error message
};

export enum CustomValidatorType {
  Greater = 'greater',
  GreaterOrEqual = 'greater_or_equal',
  Less = 'less',
  LessOrEqual = 'less_or_equal',
  Equal = 'equal',
}

export enum CleanType {
  Trim = 'trim',
  Uppercase = 'uppercase',
  Lowercase = 'lowercase',
  Capitalize = 'capitalize',
}

export type Questionnaire = {
  key: string;
  forms: FormidableForm[];
  redirectPath?: string;
};
