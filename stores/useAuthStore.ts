import { STATIC_SWR_KEYS } from '~/constants/swrKeys';
import { useStaticSWR } from './useStaticSwr';

export type AuthStore = {
  token: string;
  isLoggedin: boolean | null;
};

export const useAuthStore = () => {
  const [auth, setAuth] = useStaticSWR<AuthStore>([STATIC_SWR_KEYS.AUTH], {
    token: '',
    isLoggedin: null,
  });
  return [auth, setAuth] as [AuthStore, (value: AuthStore) => void];
};
