import { STATIC_SWR_KEYS } from '~/constants/swrKeys';
import { useStaticSWR } from './useStaticSwr';

export type LatAndLngStore = {
  lat: number | null;
  lng: number | null;
};

export const useStaticLatAndLng = () => {
  const [auth, setAuth] = useStaticSWR<LatAndLngStore>([STATIC_SWR_KEYS.LAT_AND_LNG], {
    lat: null,
    lng: null,
  });
  return [auth, setAuth] as [LatAndLngStore, (value: LatAndLngStore) => void];
};
