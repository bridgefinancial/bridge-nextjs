export const environment = {
  DJANGO_API_BASE_URL:
    process.env["NEXT_PUBLIC_DJANGO_API_BASE_URL"] ?? "http://localhost:8000",
};
