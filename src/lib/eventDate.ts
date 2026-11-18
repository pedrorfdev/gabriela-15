const TIME_ZONE = 'America/Sao_Paulo';

/** Day, short month and year of an ISO date, in the event's time zone (pt-BR). */
export function getDateParts(iso: string) {
  const date = new Date(iso);
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('pt-BR', { timeZone: TIME_ZONE, ...options }).format(date);

  return {
    day: format({ day: '2-digit' }),
    month: format({ month: 'short' }).replace('.', ''),
    year: format({ year: 'numeric' }),
  };
}