import { Industry } from "./industries.types";

export type User = {
  id: string;
  last_login: string | null;
  is_superuser: boolean;
  email: string;
  first_name: string;
  last_name: string;
  image: string | null;
  phone: string;
  date_joined: string;
  is_active: boolean;
  is_staff: boolean;
  is_verified: boolean;
  groups: string[];
  user_permissions: string[];
  company: Company;
};

export type Company = {
  address: string | null;
  city: string | null;
  country: string | null;
  created_at: string;
  email: string | null;
  has_finished_onboarding: boolean;
  id: number;
  industry: Industry;
  is_blueprint: boolean;
  name: string;
  phone_number: string | null;
  postal_code: string | null;
  state: string | null;
  updated_at: string;
  valuation: number;
  website: string | null;
};
