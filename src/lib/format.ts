const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  timeZone: 'UTC',
});

export const formatDate = (date: Date): string => dateFormatter.format(date);

/** 1 → "01" */
export const formatIndex = (value: number): string => String(value).padStart(2, '0');
