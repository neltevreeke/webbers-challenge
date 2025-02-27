export const formatDate = (date: Date, timeZone: string = "nl-NL") => {
  return date.toLocaleDateString(timeZone, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).replace(/\b[a-z]/g, (s) => s.toUpperCase());
}