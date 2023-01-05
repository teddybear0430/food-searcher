type CacheKey = {
  AUTH: 'AUTH';
  LAT_AND_LNG: 'LAT_AND_LNG';
};

export const STATIC_SWR_KEYS = {
  AUTH: 'AUTH',
  LAT_AND_LNG: 'LAT_AND_LNG',
} as const satisfies CacheKey;
