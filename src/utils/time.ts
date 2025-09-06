import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);
dayjs.locale('en');

export function formatRelativeTime(date: string | Date): string {
  return dayjs(date).fromNow();
}

export function formatDateTime(date: string | Date): string {
  return dayjs(date).format('MMM D, YYYY [at] h:mm A');
}

export function formatDate(date: string | Date): string {
  return dayjs(date).format('MMM D, YYYY');
}

export function formatTime(date: string | Date): string {
  return dayjs(date).format('h:mm A');
}

export function isToday(date: string | Date): boolean {
  return dayjs(date).isSame(dayjs(), 'day');
}

export function isYesterday(date: string | Date): boolean {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
}
