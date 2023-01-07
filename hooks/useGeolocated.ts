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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAvailable(true);
          const { latitude, longitude } = position.coords;
          setPosition({ latitude, longitude });
        },
        (error) => {
          setAvailable(false);
          setPosition({ latitude: null, longitude: null });

          if (error && !isAvailable) {
            window.alert('位置情報が有効になっていません');
          }
        }
      );
    } else {
      setAvailable(false);
      setPosition({ latitude: null, longitude: null });
    }
  }, [isAvailable, setPosition]);

  return {
    isAvailable,
    position,
  };
};
