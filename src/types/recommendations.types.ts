// Service Provider type
export type ServiceProvider = {
  name: string;
  logo: string | null; // Assuming the logo can be nullable
};

// Service type
export type Service = {
  id: number;
  name: string;
  description: string;
  provider: ServiceProvider | null; // Assuming `provider` can be nullable
  heading?: string; // Optional field for additional details
  paragraph: string;
  why_choose?: string; // Optional field
  pros_and_cons?: string; // Optional field
  button_text: string;
  button_url: string;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  [key: string]: unknown
};

// Service Category type
export type ServiceCategory = {
  id: number;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  name: string;
  priority: number;
  difficulty_rating: number;
  cost_rating: number;
  rev_rating: number;
  is_internal: boolean;
  action_header: string;
  action_description: string;
  improvement_area: number;
  services: Service[]; // Using the defined `Service` type
  [key: string]: unknown

};

// Recommendation type
export type Recommendation = {
  action_description: string;
  action_header: string;
  company: number;
  cost_rating: number;
  created_at: string;
  difficulty_rating: number;
  dt_done: string | null; // Nullable date field
  id: number;
  is_internal: boolean;
  name: string;
  priority: number;
  rev_rating: number;
  service_category: ServiceCategory; // Reference to `ServiceCategory`
  updated_at: string;
  [key: string]: unknown

};

// Improvement Area type
export type ImprovementArea = {
  id: number;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  name: string;
  short_name: string;
  icon: string | null; // Nullable icon field
  what_is_it: string;
  why_important: string;
  how_it_impacts: string;
  priority: number;
  order: number;
  improvement_category: number;
  service_category_recommendations: Recommendation[]; // Array of recommendations
  total: number;
  completed: number;
  [key: string]: unknown

};

// Improvement Category type
export type ImprovementCategory = {
  id: number;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  name: string;
  order: number;
  improvement_areas: ImprovementArea[]; // Array of ImprovementArea
  [key: string]: unknown

};
