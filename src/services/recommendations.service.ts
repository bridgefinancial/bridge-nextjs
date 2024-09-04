export const getNextActionRecommendations = async () => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/service-category-recommendations/get_next_action/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Function to fetch improvement areas
const getImprovementAreas = async () => {
  const url = `${
    process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000"
  }/api/improvement-areas/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

type GetImprovementAreaRequest = {
  id: number;
};

// Function to fetch improvement area by ID
const getImprovementArea = async ({ id }: GetImprovementAreaRequest) => {
  const url = `${
    process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000"
  }/api/improvement-areas/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Function to fetch improvement categories
const getImprovementCategories = async () => {
  const url = `${
    process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000"
  }/api/improvement-categories/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Function to fetch services
const getServices = async () => {
  const url = `${
    process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000"
  }/api/services/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Function to fetch service categories
const getServiceCategories = async () => {
  const url = `${
    process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000"
  }/api/service-categories/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Function to fetch service providers
const getServiceProviders = async () => {
  const url = `${
    process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000"
  }/api/service-providers/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Function to fetch service category recommendations
const getServiceCategoryRecommendations = async () => {
  const url = `${
    process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000"
  }/api/service-category-recommendations/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export {
  getImprovementAreas,
  getImprovementArea,
  getImprovementCategories,
  getServices,
  getServiceCategories,
  getServiceProviders,
  getServiceCategoryRecommendations,
};
