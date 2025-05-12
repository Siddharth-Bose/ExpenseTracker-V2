// Formats a date string into a readable format.
// Example: "2024-08-12" → "August 12, 2024"

export function formatDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) return "Invalid date";

  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
