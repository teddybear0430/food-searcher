import { STATIC_SWR_KEYS } from '~/constants/swrKeys';
import { useStaticSWR } from './useStaticSwr';

export type AuthStore = {
  uuid: string;
  token: string;
  isLoggedin: boolean | null;
};

export const useAuthStore = () => {
  const [auth, setAuth] = useStaticSWR<AuthStore>([STATIC_SWR_KEYS.AUTH], {
    uuid: '',
    token: '',
    isLoggedin: null,
  });
  return [auth, setAuth] as [AuthStore, (value: AuthStore) => void];
};
