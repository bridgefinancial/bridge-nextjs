export type PaginatedResponse<T> = {
  count: number; // Total count of items
  next: number;
  previous: number;
  results: T[]; // Array of results of the given type
};
