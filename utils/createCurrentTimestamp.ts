import { format } from 'date-fns-tz';

const currentTimestamp = () => format(new Date(), 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Tokyo' });
export const now = currentTimestamp();
