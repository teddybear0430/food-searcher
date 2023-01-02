import { useState, useEffect } from 'react';
import { LatAndLon } from '~/types/latAndLon';

type Result = { isAvailable: boolean; position: LatAndLon };

/**
 * 位置情報の習得とGeolocation APIが有効になっているかをチェックする処理をまとめたフック
 * */
export const useGeolocated = (): Result => {
  const [isAvailable, setAvailable] = useState(false);
  const [position, setPosition] = useState<LatAndLon>({ latitude: null, longitude: null });

  useEffect(() => {
    if ('geolocation' in navigator) {
      setAvailable(true);

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setPosition({ latitude, longitude });
      });
    } else {
      setAvailable(false);
    }
  }, [isAvailable]);

  return {
    isAvailable,
    position,
  };
};
