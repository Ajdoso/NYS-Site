/**
 * Formats numbers into Kazakh Tenge representation:
 * 42000 -> "42 000 ₸"
 */
export function formatPrice(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0 ₸';
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸';
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function truncate(text: string, length: number): string {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}
