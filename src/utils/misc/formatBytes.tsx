/**
 * Format a size in bytes to a human readable format
 *
 * @param size the size in bytes to format
 * @returns the formatted size
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0B";

  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1000));
  const formattedValue = parseFloat((bytes / Math.pow(1000, i)).toFixed(2));

  return `${formattedValue} ${units[i]}`;
}

export default formatBytes;
