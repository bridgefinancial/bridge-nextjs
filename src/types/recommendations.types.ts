export type Recommendation = {
  action_description: string;
  action_header: string;
  company: number;
  cost_rating: number;
  created_at: string;
  difficulty_rating: number;
  dt_done: string | null;
  id: number;
  is_internal: boolean;
  name: string;
  priority: number;
  rev_rating: number;
  service_category: ServiceCategory;
  updated_at: string;
};

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
  services: any[]; // Replace `any[]` with a more specific type if `services` has a defined structure
};

export type ImprovementCategory = {
  id: number;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  name: string;
  order: number;
  improvement_areas: ImprovementArea[];
};

export type ImprovementArea = {
  id: number;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  name: string;
  short_name: string;
  icon: string | null;
  what_is_it: string;
  why_important: string;
  how_it_impacts: string;
  priority: number;
  order: number;
  improvement_category: number;
  service_category_recommendations: Recommendation[];
  total: number;
  completed: number;
};
