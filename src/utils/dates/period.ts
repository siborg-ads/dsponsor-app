export function getOwnershipPeriod(
  startDate: string,
  endDate: string,
  introText: string = "Display period:"
): string {
  const start: Date = new Date(startDate.split("T")[0]);
  const end: Date = new Date(endDate.split("T")[0]);
  const today: Date = new Date();

  // Detect user locale from the browser
  const userLocale: string = navigator.language || "en-GB"; // Default to 'en-GB' if undefined

  // Format the date based on detected locale
  const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
  const startFormatted: string = start.toLocaleDateString(userLocale, options);
  const endFormatted: string = end.toLocaleDateString(userLocale, options);

  // Calculate the number of days between start and end
  const oneDay: number = 1000 * 60 * 60 * 24; // milliseconds in a day
  const daysBetween: number = Math.round((end.getTime() - start.getTime()) / oneDay);

  // Check if the period has expired or hasn't started yet
  let status: string;
  if (end < today) {
    status = "expired";
  } else if (start > today) {
    const daysUntilStart: number = Math.round((start.getTime() - today.getTime()) / oneDay);
    status = `starts in ${daysUntilStart} days`;
  } else {
    const daysLeft: number = Math.round((end.getTime() - today.getTime()) / oneDay);
    status = `expires in ${daysLeft} days`;
  }

  return `${introText} ${startFormatted} - ${endFormatted} (${daysBetween} days, ${status})`;
}
